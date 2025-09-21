import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, PieChart, Pie, Cell,
  LineChart, Line, AreaChart, Area
} from 'recharts';
import { motion } from 'framer-motion';
import { 
  Target, TrendingUp, AlertCircle, CheckCircle, BookOpen, 
  Zap, Cpu, Brain, Database, Code, Cloud, Server, 
  BarChart3, Clock, Award, User, GraduationCap, Briefcase
} from 'lucide-react';

// Enhanced mock data with more roles and detailed information
const mockSkillData = {
  'frontend-developer': {
    role: 'Frontend Developer',
    skills: [
      { skill: 'React', yourLevel: 8, requiredLevel: 9, priority: 'High', trend: 'rising' },
      { skill: 'JavaScript', yourLevel: 9, requiredLevel: 8, priority: 'Medium', trend: 'stable' },
      { skill: 'CSS & Tailwind', yourLevel: 7, requiredLevel: 8, priority: 'Medium', trend: 'rising' },
      { skill: 'TypeScript', yourLevel: 4, requiredLevel: 7, priority: 'High', trend: 'rising' },
      { skill: 'Testing (Jest)', yourLevel: 3, requiredLevel: 6, priority: 'Medium', trend: 'stable' },
      { skill: 'State Mgmt', yourLevel: 7, requiredLevel: 8, priority: 'Medium', trend: 'rising' }
    ],
    description: 'Frontend developers build the visual components of websites and applications that users interact with.',
    avgSalary: '$85,000',
    demand: 'High',
    growth: '15% (2023-2030)'
  },
  'backend-developer': {
    role: 'Backend Developer',
    skills: [
      { skill: 'Node.js', yourLevel: 7, requiredLevel: 9, priority: 'High', trend: 'rising' },
      { skill: 'Python', yourLevel: 5, requiredLevel: 7, priority: 'High', trend: 'rising' },
      { skill: 'Databases (SQL)', yourLevel: 6, requiredLevel: 8, priority: 'High', trend: 'stable' },
      { skill: 'API Design', yourLevel: 8, requiredLevel: 8, priority: 'Medium', trend: 'stable' },
      { skill: 'Docker', yourLevel: 3, requiredLevel: 6, priority: 'Medium', trend: 'rising' },
      { skill: 'Cloud (AWS)', yourLevel: 2, requiredLevel: 5, priority: 'High', trend: 'rising' }
    ],
    description: 'Backend developers work on server-side logic, databases, and application integration.',
    avgSalary: '$95,000',
    demand: 'Very High',
    growth: '20% (2023-2030)'
  },
  'ai-ml-engineer': {
    role: 'AI/ML Engineer',
    skills: [
      { skill: 'Python', yourLevel: 8, requiredLevel: 9, priority: 'High', trend: 'rising' },
      { skill: 'TensorFlow/PyTorch', yourLevel: 6, requiredLevel: 8, priority: 'High', trend: 'rising' },
      { skill: 'ML Algorithms', yourLevel: 7, requiredLevel: 9, priority: 'High', trend: 'stable' },
      { skill: 'Data Visualization', yourLevel: 6, requiredLevel: 7, priority: 'Medium', trend: 'stable' },
      { skill: 'Statistics', yourLevel: 7, requiredLevel: 8, priority: 'High', trend: 'stable' },
      { skill: 'Big Data Tools', yourLevel: 3, requiredLevel: 6, priority: 'Medium', trend: 'rising' }
    ],
    description: 'AI/ML engineers develop artificial intelligence systems and machine learning models.',
    avgSalary: '$120,000',
    demand: 'Very High',
    growth: '25% (2023-2030)'
  },
  'quantum-researcher': {
    role: 'Quantum Computing Researcher',
    skills: [
      { skill: 'Quantum Mechanics', yourLevel: 6, requiredLevel: 9, priority: 'High', trend: 'rising' },
      { skill: 'Linear Algebra', yourLevel: 8, requiredLevel: 9, priority: 'High', trend: 'stable' },
      { skill: 'Python', yourLevel: 8, requiredLevel: 8, priority: 'Medium', trend: 'stable' },
      { skill: 'Qiskit/Cirq', yourLevel: 5, requiredLevel: 7, priority: 'High', trend: 'rising' },
      { skill: 'Quantum Algorithms', yourLevel: 4, requiredLevel: 8, priority: 'High', trend: 'rising' },
      { skill: 'Research Methodology', yourLevel: 7, requiredLevel: 8, priority: 'Medium', trend: 'stable' }
    ],
    description: 'Quantum computing researchers work on developing algorithms and applications for quantum computers.',
    avgSalary: '$110,000',
    demand: 'Emerging',
    growth: '30% (2023-2030)'
  }
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

const SkillGapFinder = () => {
  const [selectedRole, setSelectedRole] = useState('ai-ml-engineer');
  const currentData = mockSkillData[selectedRole];
  
  // Calculate metrics
  const totalGap = currentData.skills.reduce((sum, skill) => sum + Math.max(0, skill.requiredLevel - skill.yourLevel), 0);
  const avgGap = (totalGap / currentData.skills.length).toFixed(1);
  const completionRate = ((currentData.skills.reduce((sum, skill) => sum + (skill.yourLevel / skill.requiredLevel), 0) / currentData.skills.length) * 100).toFixed(0);
  
  const largestGap = currentData.skills.reduce((max, skill) => {
    const gap = skill.requiredLevel - skill.yourLevel;
    return gap > max.gap ? { name: skill.skill, gap, priority: skill.priority } : max;
  }, { name: '', gap: 0, priority: '' });

  // Prepare data for charts
  const radarData = currentData.skills.map(skill => ({
    subject: skill.skill,
    A: skill.requiredLevel,
    B: skill.yourLevel,
    fullMark: 10,
  }));

  const priorityData = [
    { name: 'High', value: currentData.skills.filter(s => s.priority === 'High').length },
    { name: 'Medium', value: currentData.skills.filter(s => s.priority === 'Medium').length },
    { name: 'Low', value: currentData.skills.filter(s => s.priority === 'Low').length },
  ];

  const trendData = [
    { name: 'Rising', value: currentData.skills.filter(s => s.trend === 'rising').length },
    { name: 'Stable', value: currentData.skills.filter(s => s.trend === 'stable').length },
    { name: 'Declining', value: currentData.skills.filter(s => s.trend === 'declining').length },
  ];

  // Recommendations based on gaps
  const recommendations = currentData.skills
    .filter(skill => skill.requiredLevel > skill.yourLevel)
    .sort((a, b) => (b.requiredLevel - b.yourLevel) - (a.requiredLevel - a.yourLevel))
    .slice(0, 3)
    .map(skill => ({
      skill: skill.skill,
      gap: skill.requiredLevel - skill.yourLevel,
      recommendation: `Focus on ${skill.skill} through online courses and practical projects.`
    }));

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-green-100 text-green-800';
    }
  };

  const getTrendIcon = (trend) => {
    if (trend === 'rising') return <TrendingUp className="w-4 h-4 text-green-600" />;
    if (trend === 'declining') return <TrendingUp className="w-4 h-4 text-red-600 transform rotate-180" />;
    return <BarChart3 className="w-4 h-4 text-gray-600" />;
  };

  return (
    <motion.div
      className="p-6 pl-64 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 min-h-screen"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h1 variants={itemVariants} className="text-3xl font-bold text-gray-800 mb-2">
        Skill Gap Analyzer
      </motion.h1>
      <motion.p variants={itemVariants} className="text-gray-600 mb-8">
        Identify skill gaps and get personalized recommendations for your career growth
      </motion.p>

      {/* Role Selection */}
      <motion.div variants={itemVariants} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 mb-8">
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Select Target Role</h2>
            <p className="text-gray-600">Compare your skills with industry requirements</p>
          </div>
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="px-4 py-3 rounded-lg border border-gray-300 text-black focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full md:w-64"
          >
            <option value="frontend-developer">Frontend Developer</option>
            <option value="backend-developer">Backend Developer</option>
            <option value="ai-ml-engineer">AI/ML Engineer</option>
            <option value="quantum-researcher">Quantum Computing Researcher</option>
          </select>
        </div>
      </motion.div>

      {/* Role Overview */}
      <motion.div variants={itemVariants} className="mb-8">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold mb-2">{currentData.role}</h2>
          <p className="mb-4">{currentData.description}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center">
              <Briefcase className="w-5 h-5 mr-2" />
              <span>Avg Salary: {currentData.avgSalary}</span>
            </div>
            <div className="flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" />
              <span>Demand: {currentData.demand}</span>
            </div>
            <div className="flex items-center">
              <Zap className="w-5 h-5 mr-2" />
              <span>Growth: {currentData.growth}</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Summary Cards */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex flex-col items-center text-center">
          <div className="p-3 bg-blue-100 rounded-full mb-3">
            <Target className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-gray-500 font-semibold">Role Match</h3>
          <p className="text-2xl font-bold text-gray-800">{completionRate}%</p>
          <p className="text-sm text-gray-500 mt-1">Compatibility</p>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex flex-col items-center text-center">
          <div className="p-3 bg-red-100 rounded-full mb-3">
            <AlertCircle className="w-6 h-6 text-red-600" />
          </div>
          <h3 className="text-gray-500 font-semibold">Total Skill Gap</h3>
          <p className="text-2xl font-bold text-gray-800">{totalGap} points</p>
          <p className="text-sm text-gray-500 mt-1">Across all skills</p>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex flex-col items-center text-center">
          <div className="p-3 bg-yellow-100 rounded-full mb-3">
            <TrendingUp className="w-6 h-6 text-yellow-600" />
          </div>
          <h3 className="text-gray-500 font-semibold">Avg. Gap</h3>
          <p className="text-2xl font-bold text-gray-800">{avgGap} points</p>
          <p className="text-sm text-gray-500 mt-1">Per skill</p>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex flex-col items-center text-center">
          <div className="p-3 bg-purple-100 rounded-full mb-3">
            <Award className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="text-gray-500 font-semibold">Largest Gap</h3>
          <p className="text-2xl font-bold text-red-500">{largestGap.gap} points</p>
          <p className="text-sm text-gray-500 mt-1">{largestGap.name}</p>
        </div>
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Skill Comparison Chart */}
        <motion.div variants={itemVariants} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-blue-100 rounded-lg">
              <BarChart3 className="w-5 h-5 text-blue-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-800">Skill Level Comparison</h2>
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
                  formatter={(value, name) => [`${value}/10`, name === 'requiredLevel' ? 'Required' : 'Your Level']}
                />
                <Legend />
                <Bar dataKey="requiredLevel" fill="#cbd5e1" name="Required" radius={[0, 4, 4, 0]} />
                <Bar dataKey="yourLevel" fill="#3b82f6" name="Your Level" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Radar Chart */}
        <motion.div variants={itemVariants} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-green-100 rounded-lg">
              <Target className="w-5 h-5 text-green-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-800">Skill Profile</h2>
          </div>
          <div style={{ width: '100%', height: 400 }}>
            <ResponsiveContainer>
              <RadarChart data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis angle={30} domain={[0, 10]} />
                <Radar name="Required" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.2} />
                <Radar name="Your Level" dataKey="B" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.2} />
                <Legend />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Priority and Trend Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Priority Distribution */}
        <motion.div variants={itemVariants} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-red-100 rounded-lg">
              <AlertCircle className="w-5 h-5 text-red-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-800">Skill Priority</h2>
          </div>
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={priorityData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {priorityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={
                      entry.name === 'High' ? '#ef4444' : 
                      entry.name === 'Medium' ? '#f59e0b' : 
                      '#10b981'
                    } />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Trend Analysis */}
        <motion.div variants={itemVariants} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-purple-100 rounded-lg">
              <TrendingUp className="w-5 h-5 text-purple-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-800">Skill Trends</h2>
          </div>
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={trendData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {trendData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={
                      entry.name === 'Rising' ? '#10b981' : 
                      entry.name === 'Stable' ? '#f59e0b' : 
                      '#ef4444'
                    } />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Recommendations */}
      <motion.div variants={itemVariants} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-indigo-100 rounded-lg">
            <BookOpen className="w-5 h-5 text-indigo-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-800">Personalized Recommendations</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recommendations.map((rec, index) => (
            <div key={index} className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h3 className="font-semibold text-blue-800 mb-2">{rec.skill} (Gap: {rec.gap} points)</h3>
              <p className="text-blue-700">{rec.recommendation}</p>
              <div className="mt-3 flex items-center">
                <span className="text-xs font-medium bg-blue-100 text-blue-800 px-2 py-1 rounded">
                  Priority: {currentData.skills.find(s => s.skill === rec.skill)?.priority}
                </span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Detailed Skill Table */}
      <motion.div variants={itemVariants} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-gray-100 rounded-lg">
            <Database className="w-5 h-5 text-gray-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-800">Detailed Skill Analysis</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Skill</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Your Level</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Required</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gap</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trend</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentData.skills.map((skill, index) => {
                const gap = skill.requiredLevel - skill.yourLevel;
                return (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{skill.skill}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{skill.yourLevel}/10</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{skill.requiredLevel}/10</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        gap <= 0 ? 'bg-green-100 text-green-800' : 
                        gap <= 2 ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-red-100 text-red-800'
                      }`}>
                        {gap <= 0 ? 'No Gap' : `${gap} points`}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(skill.priority)}`}>
                        {skill.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {getTrendIcon(skill.trend)}
                        <span className="ml-1 text-sm text-gray-600 capitalize">{skill.trend}</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SkillGapFinder;