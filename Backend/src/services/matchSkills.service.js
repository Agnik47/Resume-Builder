

const getSkillGapService = (userSkills, targetSkills) => {
  if (!Array.isArray(userSkills) || !Array.isArray(targetSkills)) {
    throw new Error("Invalid input: skills must be an array.");
  }
  
  // Convert skills to a Set for efficient lookup and case-insensitive comparison
  const userSkillSet = new Set(userSkills.map(skill => skill.toLowerCase()));
  const targetSkillSet = new Set(targetSkills.map(skill => skill.toLowerCase()));
  
  const matchedSkills = [];
  const missingSkills = [];

  // Iterate through the target skills to see which ones the user has
  targetSkillSet.forEach(targetSkill => {
    if (userSkillSet.has(targetSkill)) {
      matchedSkills.push(targetSkill);
    } else {
      missingSkills.push(targetSkill);
    }
  });

  const matchScore = targetSkills.length > 0 ? (matchedSkills.length / targetSkills.length) * 100 : 0;

  return {
    score: parseFloat(matchScore.toFixed(2)),
    matchedSkills: matchedSkills,
    missingSkills: missingSkills,
  };
};

module.exports=getSkillGapService