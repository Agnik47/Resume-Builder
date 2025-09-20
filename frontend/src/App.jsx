// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage.jsx";

// Simple Dashboard placeholder
const Dashboard = () => (
  <div className="bg-black text-white min-h-screen flex items-center justify-center">
    <h1 className="text-4xl font-bold">Dashboard Page</h1>
  </div>
);

const App = () => {
  return (
    <div className="w-full min-h-screen">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
};

export default App;