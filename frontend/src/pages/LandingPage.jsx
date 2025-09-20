
import React from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import { gsap } from "gsap";

// Navbar Component
const Navbar = () => {
  return (
    <nav className="bg-black text-cyan-400 py-4 px-8 flex justify-between items-center shadow-lg fixed w-full top-0 z-50">
      <h1 className="text-2xl font-extrabold neon-text">SkillMentorAI</h1>
      <div className="space-x-6">
        <a href="#home" className="hover:text-pink-400 transition">
          Home
        </a>
        <a href="#about" className="hover:text-pink-400 transition">
          About
        </a>
        <a href="#features" className="hover:text-pink-400 transition">
          Features
        </a>
        <a href="#contact" className="hover:text-pink-400 transition">
          Contact
        </a>
        {/* New Dashboard Tab */}
        <Link to="/dashboard" className="hover:text-pink-400 transition">
          Dashboard
        </Link>
      </div>
    </nav>
  );
};

// Hero Section (Home Page Content)
const Hero = () => {
  const heroRef = useRef(null);

  useEffect(() => {
    gsap.from(heroRef.current, {
      opacity: 0,
      y: 50,
      duration: 1.5,
      ease: "power3.out",
    });
  }, []);

  return (
    <div
      id="home"
      ref={heroRef}
      className="bg-black text-center py-32 px-6 text-white"
    >
      <h1 className="text-5xl font-extrabold text-cyan-400 mb-6 neon-text">
        AI-Powered Career & Skill Mentor
      </h1>
      <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
        Millions of students face unclear career paths and skill gaps. <br />
        <span className="text-cyan-300">
          SkillMentor AI bridges this gap with personalized career guidance,
          skill analysis, and actionable roadmaps—empowering you to grow faster,
          smarter, and more confidently toward your dream role.
        </span>
      </p>
      {/* Redirects to Dashboard */}
      <Link
        to="/dashboard"
        className="bg-cyan-500 text-black px-8 py-4 rounded-lg text-lg font-bold shadow-lg hover:bg-cyan-400 transition transform hover:scale-105 neon-glow"
      >
        Get Started
      </Link>
    </div>
  );
};

// About Section
const About = () => {
  return (
    <div id="about" className="py-20 bg-black text-center px-8">
      <h2 className="text-4xl font-bold text-pink-400 mb-6 neon-text">
        About SkillMentor AI
      </h2>
      <p className="text-gray-300 max-w-3xl mx-auto">
        Our mission is to empower students by providing an AI-powered mentor
        that helps identify career paths, bridge skill gaps, and build
        confidence through personalized roadmaps, curated resources, and mock
        interview preparation.
      </p>
    </div>
  );
};

// Features Section
const Features = () => {
  const features = [
    {
      title: "Resume Analyzer",
      desc: "Upload your CV → Get ATS score, missing keywords, and recruiter insights.",
    },
    {
      title: "Career Role Recommendation",
      desc: "AI suggests best-fit roles based on your skills + market demand.",
    },
    {
      title: "Skill Gap Analysis",
      desc: "Shows what’s missing for your target job.",
    },
    {
      title: "Personalized Roadmap",
      desc: "Generates a timeline (e.g., 3 months → Developer ready).",
    },
    {
      title: "Learning Resources",
      desc: "Curated free/affordable courses, projects, and internships.",
    },
    {
      title: "AI Interview Mentor",
      desc: "Mock interview questions & feedback (stretch goal).",
    },
  ];

  return (
    <div id="features" className="py-20 bg-black text-center px-8">
      <h2 className="text-4xl font-bold text-cyan-400 mb-10 neon-text">
        Core Features
      </h2>
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {features.map((f, i) => (
          <div
            key={i}
            className="p-6 bg-gray-900 rounded-xl shadow-lg neon-card hover:scale-105 transition"
          >
            <h3 className="text-xl font-semibold mb-3 text-pink-400 neon-text">
              {f.title}
            </h3>
            <p className="text-gray-300">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// Contact Section
const Contact = () => {
  return (
    <div id="contact" className="py-20 bg-black text-center px-8">
      <h2 className="text-4xl font-bold text-green-400 mb-6 neon-text">
        Contact Us
      </h2>
      <p className="text-gray-300 mb-4">Have questions? Reach out to us at:</p>
      <a
        href="mailto:info@skillmentor.ai"
        className="text-cyan-400 font-semibold hover:underline"
      >
        info@skillmentor.ai
      </a>
    </div>
  );
};

// Footer Section
const Footer = () => {
  return (
    <div className="bg-black text-cyan-400 py-6 text-center neon-text">
      <p>© {new Date().getFullYear()} SkillMentor AI. All rights reserved.</p>
    </div>
  );
};

// Home Page (LandingPage -> only Hero)
const LandingPage = () => {
  return (
    <div className="font-sans">
      <Navbar />
      <Hero />
    </div>
  );
};

// Other Sections Page
const SectionsPage = () => {
  return (
    <div className="font-sans">
      <About />
      <Features />
      <Contact />
      <Footer />
    </div>
  );
};

export { LandingPage, SectionsPage };