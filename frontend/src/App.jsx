import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import ResumeAnalyzer from "./pages/ResumeAnalyzer";
import SkillGapFinder from "./pages//SkillGapFinder";
import Roadmap from "./pages/Roadmap";
import Resourses from "./pages/Resourses";
import InterviewMentor from "./pages/InterviewMentor";

const App = () => {
  return (
    <div className="w-full min-h-screen">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<ResumeAnalyzer />} />
          <Route path="analyzer" element={<ResumeAnalyzer />} />
          <Route path="skill-gap" element={<SkillGapFinder />} />
          <Route path="roadmap" element={<Roadmap />} />
          <Route path="resources" element={<Resourses />} />
          <Route path="interview-monitor" element={<InterviewMentor />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
