import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// --- SVG Icons (Replacement for react-icons) ---
const FaFileAlt = ({ className }) => (
  <svg className={className} stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 384 512" xmlns="http://www.w3.org/2000/svg"><path d="M369.9 97.9L286 14C277 5 264.8-.1 252.1-.1H48C21.5 0 0 21.5 0 48v416c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48V131.9c0-12.7-5.1-25-14.1-34zM336 480H48V48h160v108c0 13.3 10.7 24 24 24h108v252zM256 128V48l56 56h-56z"></path></svg>
);
const FaChartLine = ({ className }) => (
  <svg className={className} stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M496 384H64V80c0-8.84-7.16-16-16-16H16C7.16 64 0 71.16 0 80v336c0 17.67 14.33 32 32 32h464c8.84 0 16-7.16 16-16v-32c0-8.84-7.16-16-16-16zM464 96H345.94c-21.38 0-32.09 25.85-16.97 40.97l32.4 32.4L288 242.75l-73.37-73.37c-12.5-12.5-32.75-12.5-45.25 0l-68.5 68.5c-12.5 12.5-12.5 32.75 0 45.25l9.5 9.5L64 336v-64.06l76.97-76.97 71.37 71.37 112.5-112.5 45.16 45.16c15.12 15.12 40.97 4.41 40.97-16.97V112c.01-8.84-7.15-16-15.99-16z"></path></svg>
);
const FaRoute = ({ className }) => (
  <svg className={className} stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 576 512" xmlns="http://www.w3.org/2000/svg"><path d="M543.6 254.3c-7.5-8.1-18.9-9.3-28.2-3.1L288 384.4l-112-140.7c-8.4-10.5-22.8-13.1-34.6-6.4l-144 88c-11.1 6.8-15.2 20.3-8.4 31.4l41.6 68.2c6.8 11.1 20.3 15.2 31.4 8.4l102.4-62.7L288 433.3l184.4-122.9c11.1-7.4 15.6-21.2 9.2-32.4zm-14.1-141.6L424.2 8.7c-8.1-8.1-21.2-8.1-29.3 0L288 115.6 181.1 8.7c-8.1-8.1-21.2-8.1-29.3 0L46.5 112.7C37.3 122 36 135.6 43 145.4l41.6 57.8c6.8 9.5 18.6 12.7 29.2 8.4L216 156.9l72 90 72-90 102.2 55.7c10.6 4.3 22.4 1.1 29.2-8.4l41.6-57.8c7-9.8 5.7-23.4-3.5-31.5z"></path></svg>
);
const FaBook = ({ className }) => (
  <svg className={className} stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg"><path d="M448 360V24c0-13.3-10.7-24-24-24H96C43 0 0 43 0 96v320c0 53 43 96 96 96h328c13.3 0 24-10.7 24-24v-16c0-7.5-3.5-14.3-8.9-18.7-4.2-15.4-4.2-59.3 0-74.7 5.4-4.3 8.9-11.1 8.9-18.6zM128 134c0-3.3 2.7-6 6-6h212c3.3 0 6 2.7 6 6v20c0 3.3-2.7 6-6 6H134c-3.3 0-6-2.7-6-6v-20zm0 64c0-3.3 2.7-6 6-6h212c3.3 0 6 2.7 6 6v20c0 3.3-2.7 6-6 6H134c-3.3 0-6-2.7-6-6v-20zm252 200H134c-3.3 0-6-2.7-6-6v-20c0-3.3 2.7-6 6-6h246c3.3 0 6 2.7 6 6v20c0 3.3-2.7 6-6 6z"></path></svg>
);


const Sidenavbar = ({ show }) => {
  const navItems = [
    { name: 'Analyzer', Icon: FaFileAlt, path: '/dashboard/analyzer' },
    { name: 'Skill Gap', Icon: FaChartLine, path: '/dashboard/skill-gap' },
    { name: 'Roadmap', Icon: FaRoute, path: '/dashboard/roadmap' },
    { name: 'Resources', Icon: FaBook, path: '/dashboard/resources' },
    { name: 'Interview Mentor', Icon: FaBook, path: '/dashboard/interview-monitor' },
  ];

  const sidebarVariants = {
    hidden: { opacity: 0, x: -100, width: 0 },
    visible: { opacity: 1, x: 0, width: '16rem', transition: { duration: 0.5, ease: 'easeInOut' } },
    exit: { opacity: 0, x: -100, width: 0, transition: { duration: 0.3, ease: 'easeInOut' } },
  };

  const navItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.3 + i * 0.1,
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
          className="bg-white h-screen w-64  fixed top-0 z-10 left-0 text-gray-900 flex flex-col shadow-lg flex-shrink-0"
        >
          <div className="p-5 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-900 whitespace-nowrap">SkillMentor AI</h1>
          </div>
          <nav className="flex-1 p-2">
            <ul>
              {navItems.map((item, i) => (
                <motion.li key={item.name} custom={i} variants={navItemVariants} initial="hidden" animate="visible">
                  <NavLink
                    to={item.path}
                     onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    className={({ isActive }) =>
                      `flex items-center p-3 my-1 rounded-lg transition-colors duration-200 whitespace-nowrap ${
                        isActive
                          ? 'bg-blue-600 text-white'
                          : 'hover:bg-gray-100 text-gray-700'
                      }`
                    }
                  >
                    <item.Icon className="mr-4 text-lg w-5 h-5 flex-shrink-0" />
                    {item.name}
                  </NavLink>
                </motion.li>
              ))}
            </ul>
          </nav>
          <div className="p-5 border-t border-gray-200">
            <p className="text-gray-500 whitespace-nowrap">User Profile</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Sidenavbar;

