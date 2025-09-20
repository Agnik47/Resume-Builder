import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import ResumeAnalyzer from "./pages/ResumeAnalyzer";
import SkillGapFinder from "./SkillGapFinder";
import Roadmap from "./pages/Roadmap";

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
        </Route>
      </Routes>
    </div>
  );
};

export default App;
