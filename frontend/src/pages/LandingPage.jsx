
/*import React from 'react'
import Navbar from '../components/Landing/Navbar'
import { Link } from 'react-router-dom'

function LandingPage() {

/*function LandingPage() {
>>>>>>> e7c8009 (frontend changes commited)
  return (
    <div>
        <Navbar />
        <Link to='/dashboard'>Go to Dashboard</Link>
    </div>
  )
}
<<<<<<< HEAD

export default LandingPage
=======
*/
import React from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div id="home" className="bg-gray-100 text-center py-20 px-6">
      <h1 className="text-4xl font-bold text-blue-700 mb-4">
        AI-Powered Career & Skill Mentor
      </h1>
      <p className="text-lg text-gray-700 mb-6 max-w-2xl mx-auto">
        Millions of students struggle with unclear career paths and skill gaps. 
        SkillMentor AI bridges the gap between skills, careers, and learning—personalized just for you.
      </p>
      <Link
        to="/dashboard"
        className="bg-blue-600 text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-blue-700"
      >
        Get Started
      </Link>
    </div>
  );
};

const About = () => {
  return (
    <div id="about" className="py-16 bg-gray-100 text-center px-8">
      <h2 className="text-3xl font-bold text-blue-700 mb-6">About SkillMentor AI</h2>
      <p className="text-gray-700 max-w-3xl mx-auto">
        Our mission is to empower students by providing an AI-powered mentor that 
        helps identify career paths, bridge skill gaps, and build confidence through 
        personalized roadmaps, curated resources, and mock interview preparation.
      </p>
    </div>
  );
};

const Features = () => {
  const features = [
    {
      title: "Resume Analyzer",
      desc: "Upload your CV → Get ATS score, missing keywords, and recruiter insights."
    },
    {
      title: "Career Role Recommendation",
      desc: "AI suggests best-fit roles based on your skills + market demand."
    },
    {
      title: "Skill Gap Analysis",
      desc: "Shows what’s missing for your target job."
    },
    {
      title: "Personalized Roadmap",
      desc: "Generates a timeline (e.g., 3 months → Developer ready)."
    },
    {
      title: "Learning Resources",
      desc: "Curated free/affordable courses, projects, and internships."
    },
    {
      title: "AI Interview Mentor",
      desc: "Mock interview questions & feedback (stretch goal)."
    }
  ];

  return (
    <div id="features" className="py-16 bg-white">
      <h2 className="text-3xl font-bold text-center text-blue-700 mb-10">
        Core Features
      </h2>
      <div className="grid md:grid-cols-3 gap-8 px-8 max-w-6xl mx-auto">
        {features.map((f, i) => (
          <div key={i} className="p-6 bg-gray-50 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-3">{f.title}</h3>
            <p className="text-gray-600">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const Contact = () => {
  return (
    <div id="contact" className="py-16 bg-white text-center px-8">
      <h2 className="text-3xl font-bold text-blue-700 mb-6">Contact Us</h2>
      <p className="text-gray-700 mb-4">Have questions? Reach out to us at:</p>
      <a href="mailto:info@skillmentor.ai" className="text-blue-600 font-semibold hover:underline">
        info@skillmentor.ai
      </a>
    </div>
  );
};

const Footer = () => {
  return (
    <div className="bg-blue-600 text-white py-6 text-center">
      <p>© {new Date().getFullYear()} SkillMentor AI. All rights reserved.</p>
    </div>
  );
};

const LandingPage = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <About />
      <Features />
      <Contact />
      <Footer />
    </div>
  );
};

export default LandingPage;
