import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaFileAlt, FaChartLine, FaRoute, FaBook } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const Sidenavbar = ({ show }) => {
  const navItems = [
    { name: 'Analyzer', icon: <FaFileAlt />, path: '/dashboard/analyzer' },
    { name: 'Skill Gap', icon: <FaChartLine />, path: '/dashboard/skill-gap' },
    { name: 'Roadmap', icon: <FaRoute />, path: '/dashboard/roadmap' },
    { name: 'Resources', icon: <FaBook />, path: '/dashboard/resources' },
  ];

  const sidebarVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: 'easeInOut' } },
    exit: { opacity: 0, x: -100, transition: { duration: 0.3, ease: 'easeInOut' } },
  };

  const navItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.3 + i * 0.1, // Staggered delay for each item
        duration: 0.4,
      },
    }),
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          variants={sidebarVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="w-64 h-screen bg-gray-900 text-gray-200 flex flex-col shadow-lg"
        >
          <div className="p-5 border-b border-gray-700">
            <h1 className="text-2xl font-bold text-white">SkillMentor AI</h1>
          </div>
          <nav className="flex-1 p-2">
            <ul>
              {navItems.map((item, i) => (
                <motion.li key={item.name} custom={i} variants={navItemVariants}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center p-3 my-1 rounded-lg transition-colors duration-200 ${
                        isActive
                          ? 'bg-blue-600 text-white'
                          : 'hover:bg-gray-700 text-gray-300'
                      }`
                    }
                  >
                    <span className="mr-4 text-lg">{item.icon}</span>
                    {item.name}
                  </NavLink>
                </motion.li>
              ))}
            </ul>
          </nav>
          <div className="p-5 border-t border-gray-700">
            <p className="text-gray-400">User Profile</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Sidenavbar;