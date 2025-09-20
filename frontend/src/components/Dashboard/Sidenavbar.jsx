import React from "react";
import { NavLink } from "react-router-dom"; // Import NavLink
import {
  FaFileAlt,
  FaChartLine,
  FaRoute,
  FaBook,
  FaComments,
} from "react-icons/fa";

const Sidenavbar = () => {
  const navItems = [
    {
      name: "Resume Analyzer",
      icon: <FaFileAlt />,
      path: "/dashboard/analyzer",
    },
    {
      name: "Skill Gap Finder",
      icon: <FaChartLine />,
      path: "/dashboard/skill-gap",
    },
    { name: "Roadmap", icon: <FaRoute />, path: "/dashboard/roadmap" },
    //... other items
  ];

  const activeLinkStyle = {
    backgroundColor: "#374151", // A darker gray for the active link (bg-gray-700)
  };

  return (
    <div className="w-64 h-screen bg-gray-800 text-white flex flex-col">
      {/* ... (Logo/Header code remains the same) ... */}
      <div className="p-5 border-b border-gray-700">
        <h1 className="text-2xl font-bold">SkillMentor AI</h1>
      </div>
      <nav className="flex-1 p-2">
        <ul>
          {navItems.map((item) => (
            <li key={item.name} className="mb-2">
              <NavLink
                to={item.path}
                // This style prop automatically applies when the link is active
                style={({ isActive }) =>
                  isActive ? activeLinkStyle : undefined
                }
                className="flex items-center p-3 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <span className="mr-3 text-lg">{item.icon}</span>
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-5 border-t border-gray-700">
        <p>User Profile</p>
      </div>
    </div>
  );
};

export default Sidenavbar;
