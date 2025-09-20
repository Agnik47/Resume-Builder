// src/pages/LandingPage.jsx
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Navbar Component
const Navbar = () => {
  const scrollToSection = (id) => (e) => {
    e.preventDefault();
    const section = document.getElementById(id);
    if (section) {
      const yOffset = -80; // height of fixed navbar
      const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <nav className="bg-white text-gray-800 py-4 px-8 flex justify-between items-center shadow-md fixed w-full top-0 z-50">
      <h1 className="text-2xl font-bold text-blue-600">SkillMentor<span className="text-orange-500">AI</span></h1>
      <div className="space-x-6">
        <a href="#home" onClick={scrollToSection("home")} className="hover:text-blue-600 transition-colors font-medium">Home</a>
        <a href="#about" onClick={scrollToSection("about")} className="hover:text-blue-600 transition-colors font-medium">About</a>
        <a href="#features" onClick={scrollToSection("features")} className="hover:text-blue-600 transition-colors font-medium">Features</a>
        <a href="#contact" onClick={scrollToSection("contact")} className="hover:text-blue-600 transition-colors font-medium">Contact</a>
        <Link to="/dashboard" className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">Dashboard</Link>
      </div>
    </nav>
  );
};

// Hero Section
const Hero = () => {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const textRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(titleRef.current, 
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    );
    
    gsap.fromTo(textRef.current, 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, delay: 0.3, ease: "power3.out" }
    );
    
    gsap.fromTo(ctaRef.current, 
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 0.8, delay: 0.6, ease: "back.out(1.7)" }
    );
  }, []);

  return (
    <section
      id="home"
      ref={heroRef}
      className="bg-gradient-to-br from-white to-blue-50 pt-40 pb-32 px-6 min-h-screen flex flex-col justify-center items-center"
    >
      <div className="max-w-4xl mx-auto text-center">
        <h1 ref={titleRef} className="text-5xl font-bold text-gray-800 mb-6">
          AI-Powered Career & Skill Mentor
        </h1>
        <p ref={textRef} className="text-xl text-gray-600 mb-10 leading-relaxed">
          Millions of students face unclear career paths and skill gaps.{" "}
          <span className="text-blue-600 font-semibold">
            SkillMentor AI bridges this gap with personalized career guidance,
            skill analysis, and actionable roadmaps — empowering you to grow
            faster, smarter, and more confidently toward your dream role.
          </span>
        </p>
        <Link
          ref={ctaRef}
          to="/dashboard"
          className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold shadow-lg hover:bg-blue-700 transition-colors"
        >
          Get Started Free
        </Link>
      </div>
      
      {/* Hero illustration */}
      <div className="mt-16 w-full max-w-4xl mx-auto">
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-1 bg-blue-50 p-4 rounded-lg h-64 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                </div>
                <p className="text-gray-600">Upload your resume</p>
              </div>
            </div>
            
            <div className="flex-1 bg-blue-50 p-4 rounded-lg h-64 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                  </svg>
                </div>
                <p className="text-gray-600">Get personalized insights</p>
              </div>
            </div>
            
            <div className="flex-1 bg-blue-50 p-4 rounded-lg h-64 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                  </svg>
                </div>
                <p className="text-gray-600">Follow your roadmap to success</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// About Section
const About = () => {
  const aboutRef = useRef(null);
  
  useEffect(() => {
    gsap.fromTo(aboutRef.current, 
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: aboutRef.current,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      }
    );
  }, []);

  return (
    <section id="about" ref={aboutRef} className="py-20 pt-32 bg-white px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-6">About SkillMentor AI</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Our mission is to empower students by providing an AI-powered mentor
          that helps identify career paths, bridge skill gaps, and build
          confidence through personalized roadmaps, curated resources, and mock
          interview preparation.
        </p>
      </div>
    </section>
  );
};

// Features Section
const Features = () => {
  const featuresRef = useRef(null);
  const features = [
    { 
      title: "Resume Analyzer", 
      desc: "Upload your CV → Get ATS score, missing keywords, and recruiter insights.",
      icon: (
        <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
        </svg>
      )
    },
    { 
      title: "Career Role Recommendation", 
      desc: "AI suggests best-fit roles based on your skills + market demand.",
      icon: (
        <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
        </svg>
      )
    },
    { 
      title: "Skill Gap Analysis", 
      desc: "Shows what's missing for your target job with detailed insights.",
      icon: (
        <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
        </svg>
      )
    },
    { 
      title: "Personalized Roadmap", 
      desc: "Generates a timeline (e.g., 3 months → Developer ready).",
      icon: (
        <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
        </svg>
      )
    },
    { 
      title: "Learning Resources", 
      desc: "Curated free/affordable courses, projects, and internships.",
      icon: (
        <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
        </svg>
      )
    },
    { 
      title: "AI Interview Mentor", 
      desc: "Mock interview questions & feedback to prepare you for success.",
      icon: (
        <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
        </svg>
      )
    },
  ];

  useEffect(() => {
    const featureCards = gsap.utils.toArray('.feature-card');
    
    featureCards.forEach((card, i) => {
      gsap.fromTo(card, 
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: i * 0.1,
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none none"
          }
        }
      );
    });
  }, []);

  return (
    <section id="features" ref={featuresRef} className="py-20 pt-32 bg-gray-50 px-8">
      <div className="max-w-6xl mx-auto text-center mb-16">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">Core Features</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Everything you need to bridge the gap between your current skills and your dream career
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {features.map((f, i) => (
          <div 
            key={i} 
            className="feature-card bg-white p-8 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center"
          >
            <div className="bg-blue-50 p-4 rounded-full mb-6">
              {f.icon}
            </div>
            <h3 className="text-xl font-semibold mb-4 text-gray-800">{f.title}</h3>
            <p className="text-gray-600">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

// Contact Section
const Contact = () => {
  const contactRef = useRef(null);
  
  useEffect(() => {
    gsap.fromTo(contactRef.current, 
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: contactRef.current,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      }
    );
  }, []);

  return (
    <section id="contact" ref={contactRef} className="py-20 pt-32 bg-white px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-6">Contact Us</h2>
        <p className="text-xl text-gray-600 mb-8">Have questions? Reach out to our team for more information</p>
        <a href="mailto:info@skillmentor.ai" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition-colors">
          info@skillmentor.ai
        </a>
      </div>
    </section>
  );
};

// Footer
const Footer = () => (
  <footer className="bg-gray-800 text-white py-12 text-center">
    <div className="max-w-6xl mx-auto px-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-4 md:mb-0">SkillMentor<span className="text-orange-500">AI</span></h2>
        <div className="flex space-x-6">
          <a href="#home" className="hover:text-blue-400 transition-colors">Home</a>
          <a href="#about" className="hover:text-blue-400 transition-colors">About</a>
          <a href="#features" className="hover:text-blue-400 transition-colors">Features</a>
          <a href="#contact" className="hover:text-blue-400 transition-colors">Contact</a>
          <Link to="/dashboard" className="text-blue-400 hover:text-blue-300 transition-colors">Dashboard</Link>
        </div>
      </div>
      <p className="text-gray-400">© {new Date().getFullYear()} SkillMentor AI. All rights reserved.</p>
    </div>
  </footer>
);

// LandingPage Component
const LandingPage = () => (
  <div className="font-sans overflow-hidden">
    <Navbar />
    <Hero />
    <About />
    <Features />
    <Contact />
    <Footer />
  </div>
);

export default LandingPage;