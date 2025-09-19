# backend/src/ml/nlp_pipeline.py

import os
import json
import re
from datetime import datetime
import spacy
from spacy.matcher import Matcher
from ml.preprocess import clean_text
from rapidfuzz import fuzz

# --- spaCy model: try large, fallback to small ---
try:
    nlp = spacy.load("en_core_web_lg")
except Exception:
    try:
        nlp = spacy.load("en_core_web_sm")
    except Exception:
        raise RuntimeError("spaCy model not found. Run: python -m spacy download en_core_web_lg")

# --- Load skills from skills.json (flatten categories) ---
BASE_DIR = os.path.dirname(__file__)
SKILLS_FILE = os.path.join(BASE_DIR, "skills.json")
if not os.path.exists(SKILLS_FILE):
    raise FileNotFoundError(f"skills.json not found at {SKILLS_FILE}")

with open(SKILLS_FILE, "r", encoding="utf-8") as f:
    SKILL_CATEGORIES = json.load(f)

SKILLS_LIST = [skill.lower() for group in SKILL_CATEGORIES.values() for skill in group]

# Matcher setup (token-level, case-insensitive)
matcher = Matcher(nlp.vocab)
for skill in SKILLS_LIST:
    pattern = [{"LOWER": token.lower_} for token in nlp(skill)]
    # Use the skill string as the matcher ID (lowercased)
    matcher.add(skill, [pattern])


# --- Helpers for education extraction ---
DEGREE_KEYWORDS = [
    "bachelor", "b.sc", "btech", "b.tech", "b.e", "b.eng", "bachelor of",
    "master", "m.sc", "mtech", "m.tech", "mba", "mca", "phd", "doctor",
    "diploma", "associate"
]

UNI_KEYWORDS = ["university", "institute", "college", "school", "iit", "mit", "nit"]


def extract_education_from_text(text: str) -> list:
    """
    Return a list of candidate education snippets found via simple heuristics:
    - lines that include degree keywords
    - lines mentioning university/institute/college
    """
    found = []
    # Split into lines for localized searching (use original text to keep casing)
    for line in text.splitlines():
        line_strip = line.strip()
        if len(line_strip) < 4:
            continue
        # contains degree keyword?
        for kw in DEGREE_KEYWORDS:
            if re.search(rf"\b{re.escape(kw)}\b", line_strip, flags=re.I):
                found.append(line_strip)
                break
        else:
            # contains university/institute keyword?
            for u in UNI_KEYWORDS:
                if re.search(rf"\b{re.escape(u)}\b", line_strip, flags=re.I):
                    found.append(line_strip)
                    break

    # De-duplicate, preserve order
    deduped = []
    for x in found:
        if x not in deduped:
            deduped.append(x)
    return deduped


# --- Helpers for experience extraction ---
MONTHS = {
    'jan':1,'feb':2,'mar':3,'apr':4,'may':5,'jun':6,'jul':7,'aug':8,'sep':9,'sept':9,'oct':10,'nov':11,'dec':12
}

def _parse_month_year(s: str):
    s = s.strip()
    # Try formats: "Jan 2018", "January 2018"
    m = re.match(r'([A-Za-z]{3,9})\s+(\d{4})', s)
    if m:
        mon = m.group(1)[:3].lower()
        year = int(m.group(2))
        return year, MONTHS.get(mon, 1)
    # Year-only
    m2 = re.match(r'(\d{4})', s)
    if m2:
        return int(m2.group(1)), 1
    return None, None


def extract_experience_years(text: str) -> float:
    """
    Try to estimate total years of experience.
    Steps:
      1) look for explicit "X years" or "total experience: X years" -> prefer this
      2) parse YYYY-YYYY ranges and month-year ranges -> merge intervals -> sum years
      3) fallback: largest "X years" phrase found
    Returns float (years), rounded to 1 decimal. Returns 0.0 if none detected.
    """
    text_orig = text  # keep original to get better matches
    # 1) explicit total experience
    m = re.search(r'(?:total|overall)?\s*experience[:\s]*([0-9]+(?:\.[0-9]+)?)\s*\+?\s*years', text_orig, flags=re.I)
    if m:
        return round(float(m.group(1)), 1)

    # 2) date ranges (YYYY-YYYY and month YYYY - month YYYY, with "present")
    intervals = []

    # Year - Year (e.g., 2018-2020)
    for match in re.finditer(r'(\d{4})\s*[-–—]\s*(present|\d{4})', text_orig, flags=re.I):
        start = int(match.group(1))
        end_raw = match.group(2).lower()
        end = datetime.now().year if end_raw.startswith('present') else int(end_raw)
        intervals.append((start, end))

    # Month YYYY - Month YYYY (e.g., Jan 2018 - Mar 2020)
    for match in re.finditer(r'([A-Za-z]{3,9}\s+\d{4})\s*[-–—]\s*(present|[A-Za-z]{3,9}\s+\d{4})', text_orig, flags=re.I):
        s_raw = match.group(1)
        e_raw = match.group(2)
        s_year, s_month = _parse_month_year(s_raw)
        if str(e_raw).lower().startswith('present'):
            e_year, e_month = datetime.now().year, datetime.now().month
        else:
            e_year, e_month = _parse_month_year(e_raw)
        if s_year:
            # Convert to months since epoch → easier to merge
            s_total = s_year * 12 + (s_month or 1)
            e_total = e_year * 12 + (e_month or 1)
            intervals.append((s_total, e_total, True))  # mark as months interval

    # Normalize mixed intervals (year-only intervals stored as years)
    year_intervals = []
    month_intervals = []
    for it in intervals:
        if len(it) == 2:
            year_intervals.append(it)
        else:
            month_intervals.append(it[:2])

    # Merge year intervals (convert to month ranges to unify)
    for s, e in year_intervals:
        month_intervals.append((s*12, e*12))

    if not month_intervals:
        # 3) fallback: any "X years" phrase, use the largest numeric value found
        found_yrs = [float(m.group(1)) for m in re.finditer(r'(\d+(?:\.\d+)?)\s*\+?\s*years', text_orig, flags=re.I)]
        if found_yrs:
            return round(max(found_yrs), 1)
        return 0.0

    # merge month intervals (list of (start_month, end_month))
    month_intervals = sorted(month_intervals, key=lambda x: x[0])
    merged = []
    for s, e in month_intervals:
        if not merged:
            merged.append([s, e])
        else:
            if s <= merged[-1][1]:
                merged[-1][1] = max(merged[-1][1], e)
            else:
                merged.append([s, e])

    total_months = sum((e - s) for s, e in merged)
    years = total_months / 12.0
    return round(years, 1)


# --- parse_resume: final function used by others ---
def parse_resume(resume_text: str) -> dict:
    """
    Full resume parsing:
      - extract skills (matcher + fuzzy)
      - extract name (NER PERSON)
      - extract organizations (NER ORG)
      - extract education lines (heuristic)
      - estimate experience years
    """
    # Use original text for NER; use cleaned text for skill matching (clean_text lowercases)
    doc_raw = nlp(resume_text)
    cleaned = clean_text(resume_text)
    doc_clean = nlp(cleaned)

    extracted = {
        "name": None,
        "skills": [],
        "organizations": [],
        "education": [],
        "experience_years": 0.0
    }

    # Skills via matcher + fuzzy token fallback
    matches = matcher(doc_clean)
    skills_found = set()
    for match_id, start, end in matches:
        skills_found.add(nlp.vocab.strings[match_id])

    # fuzzy token fallback
    for token in doc_clean:
        tok = token.text.lower()
        for skill in SKILLS_LIST:
            if fuzz.partial_ratio(tok, skill) > 92:
                skills_found.add(skill)

    extracted["skills"] = sorted(skills_found)

    # NER: name & organizations
    for ent in doc_raw.ents:
        if ent.label_ == "PERSON" and not extracted["name"]:
            extracted["name"] = ent.text
        elif ent.label_ == "ORG":
            if ent.text not in extracted["organizations"]:
                extracted["organizations"].append(ent.text)

    # Education heuristic
    extracted["education"] = extract_education_from_text(resume_text)

    # Experience estimation
    extracted["experience_years"] = extract_experience_years(resume_text)

    return extracted


def extract_skills_from_description(job_description: str) -> list:
    """
    Extract skills from JD using matcher + fuzzy fallback.
    """
    cleaned = clean_text(job_description)
    doc = nlp(cleaned)
    matches = matcher(doc)
    found = set()
    for match_id, start, end in matches:
        found.add(nlp.vocab.strings[match_id])

    # fuzzy fallback (token-level)
    for token in doc:
        tok = token.text.lower()
        for skill in SKILLS_LIST:
            if fuzz.partial_ratio(tok, skill) > 92:
                found.add(skill)

    return sorted(found)
