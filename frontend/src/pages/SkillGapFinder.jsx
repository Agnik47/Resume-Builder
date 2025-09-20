import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const mockSkillData = {
  'frontend-developer': { /* ... same data as before ... */ },
  'backend-developer': { /* ... same data as before ... */ },
};

// Re-using the mock data from your previous code
mockSkillData['frontend-developer'] = { role: 'Frontend Developer', skills: [{ skill: 'React', yourLevel: 8, requiredLevel: 9 }, { skill: 'JavaScript', yourLevel: 9, requiredLevel: 8 }, { skill: 'CSS & Tailwind', yourLevel: 7, requiredLevel: 8 }, { skill: 'TypeScript', yourLevel: 4, requiredLevel: 7 }, { skill: 'Testing (Jest)', yourLevel: 3, requiredLevel: 6 }, { skill: 'State Mgmt', yourLevel: 7, requiredLevel: 8 }] };
mockSkillData['backend-developer'] = { role: 'Backend Developer', skills: [{ skill: 'Node.js', yourLevel: 7, requiredLevel: 9 }, { skill: 'Python', yourLevel: 5, requiredLevel: 7 }, { skill: 'Databases (SQL)', yourLevel: 6, requiredLevel: 8 }, { skill: 'API Design', yourLevel: 8, requiredLevel: 8 }, { skill: 'Docker', yourLevel: 3, requiredLevel: 6 }, { skill: 'Cloud (AWS)', yourLevel: 2, requiredLevel: 5 }] };

const SkillGapFinder = () => {
  const [selectedRole, setSelectedRole] = useState('frontend-developer');
  const currentData = mockSkillData[selectedRole];
  const largestGap = currentData.skills.reduce((max, skill) => {
    const gap = skill.requiredLevel - skill.yourLevel;
    return gap > max.gap ? { name: skill.skill, gap } : max;
  }, { name: '', gap: 0 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
        className="p-4  pl-64"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
    >
      <motion.h1 variants={itemVariants} className="text-3xl font-bold text-gray-800 mb-6">
        Detailed Skill Gap Analysis
      </motion.h1>

      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Summary Cards */}
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <h3 className="text-gray-500 font-semibold">Target Role</h3>
            <p className="text-2xl font-bold text-gray-800">{currentData.role}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <h3 className="text-gray-500 font-semibold">Total Skills Analyzed</h3>
            <p className="text-2xl font-bold text-gray-800">{currentData.skills.length}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <h3 className="text-gray-500 font-semibold">Largest Skill Gap</h3>
            <p className="text-2xl font-bold text-red-500">{largestGap.name} ({largestGap.gap} pts)</p>
          </div>
      </motion.div>

      <motion.div variants={itemVariants} className="bg-white p-6 rounded-xl shadow-sm border">
        <div className="flex flex-col md:flex-row justify-between md:items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Skill Level Comparison</h2>
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="mt-2 md:mt-0 w-full md:w-auto pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md shadow-sm"
          >
            <option value="frontend-developer">Frontend Developer</option>
            <option value="backend-developer">Backend Developer</option>
          </select>
        </div>
        <div style={{ width: '100%', height: 400 }}>
          <ResponsiveContainer>
            <BarChart data={currentData.skills} layout="vertical" margin={{ top: 5, right: 30, left: 100, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              <XAxis type="number" domain={[0, 10]} ticks={[0,2,4,6,8,10]} stroke="#9ca3af" />
              <YAxis dataKey="skill" type="category" stroke="#9ca3af" />
              <Tooltip
                cursor={{ fill: 'rgba(243, 244, 246, 0.5)' }}
                contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '0.5rem' }}
              />
              <Legend />
              <Bar dataKey="requiredLevel" fill="#cbd5e1" name="Required" radius={[0, 4, 4, 0]} />
              <Bar dataKey="yourLevel" fill="#3b82f6" name="Your Level" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SkillGapFinder;