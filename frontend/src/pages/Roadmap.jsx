import React, { useState } from 'react';
import { 
  FaCheckCircle, FaSpinner, FaCircle, FaLink, 
  FaCalendar, FaClock, FaChartLine, FaBook, FaVideo,
  FaCertificate, FaProjectDiagram, FaTasks 
} from 'react-icons/fa';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, RadialBarChart, RadialBar, PolarAngleAxis
} from 'recharts';
import { motion } from 'framer-motion';

// Enhanced mock data with multiple roadmaps for different roles
const mockRoadmapData = {
  'frontend-developer': [
    {
      id: 1,
      duration: 'Weeks 1-2',
      title: 'Strengthen CSS & Tailwind Fundamentals',
      description: 'Deepen your understanding of modern CSS, including Flexbox, Grid, and advanced responsive design techniques with Tailwind CSS.',
      status: 'completed',
      estimatedHours: 20,
      priority: 'High',
      resources: [
        { name: 'Tailwind Labs Official Docs', url: '#', type: 'documentation' },
        { name: 'CSS-Tricks Flexbox Guide', url: '#', type: 'tutorial' },
        { name: 'Advanced CSS Course', url: '#', type: 'course' },
      ],
      milestones: [
        'Create 3 responsive layouts using CSS Grid',
        'Build a component library with Tailwind',
        'Complete CSS challenges on Frontend Mentor'
      ]
    },
    {
      id: 2,
      duration: 'Weeks 3-5',
      title: 'Master Advanced React Concepts',
      description: 'Move beyond the basics. Focus on Hooks, Context API for state management, and performance optimization with memoization.',
      status: 'inProgress',
      estimatedHours: 35,
      priority: 'High',
      resources: [
        { name: 'React Official Docs (Advanced)', url: '#', type: 'documentation' },
        { name: 'Build a complex project with Hooks', url: '#', type: 'project' },
        { name: 'React Performance Masterclass', url: '#', type: 'course' },
      ],
      milestones: [
        'Build a React app using Context API for state management',
        'Implement React.memo and useMemo in a project',
        'Create custom hooks for common functionality'
      ]
    },
    {
      id: 3,
      duration: 'Weeks 6-7',
      title: 'Learn TypeScript',
      description: 'Integrate TypeScript into your React projects to add static typing, reduce bugs, and improve code maintainability.',
      status: 'todo',
      estimatedHours: 25,
      priority: 'Medium',
      resources: [
        { name: 'TypeScript Handbook', url: '#', type: 'documentation' },
        { name: 'React TypeScript Cheatsheet', url: '#', type: 'tutorial' },
        { name: 'TypeScript for React Developers', url: '#', type: 'course' },
      ],
      milestones: [
        'Convert a JavaScript React app to TypeScript',
        'Create type definitions for a complex data structure',
        'Build a small project with TypeScript from scratch'
      ]
    },
    {
      id: 4,
      duration: 'Week 8',
      title: 'Explore Testing with Jest & RTL',
      description: 'Learn to write unit and integration tests for your React components using Jest and React Testing Library (RTL).',
      status: 'todo',
      estimatedHours: 15,
      priority: 'Medium',
      resources: [
        { name: 'React Testing Library Docs', url: '#', type: 'documentation' },
        { name: 'Jest Testing Framework', url: '#', type: 'tutorial' },
        { name: 'Testing Workshop', url: '#', type: 'course' },
      ],
      milestones: [
        'Write tests for all components in a small React app',
        'Achieve 80% test coverage on a project',
        'Implement mocking for API calls in tests'
      ]
    },
    {
      id: 5,
      duration: 'Weeks 9-10',
      title: 'Build Portfolio Projects',
      description: 'Create 2-3 impressive projects that demonstrate your full-stack capabilities and deploy them.',
      status: 'todo',
      estimatedHours: 40,
      priority: 'High',
      resources: [
        { name: 'Project Ideas Repository', url: '#', type: 'inspiration' },
        { name: 'Deployment Guide', url: '#', type: 'tutorial' },
        { name: 'Portfolio Best Practices', url: '#', type: 'guide' },
      ],
      milestones: [
        'Complete a full-stack application with authentication',
        'Deploy projects to Vercel/Netlify',
        'Optimize projects for performance and SEO'
      ]
    }
  ],
  'ai-ml-engineer': [
    {
      id: 1,
      duration: 'Weeks 1-3',
      title: 'Advanced Python for Data Science',
      description: 'Master Python libraries for data manipulation and analysis including Pandas, NumPy, and SciPy.',
      status: 'completed',
      estimatedHours: 30,
      priority: 'High',
      resources: [
        { name: 'Python Data Science Handbook', url: '#', type: 'book' },
        { name: 'Pandas Documentation', url: '#', type: 'documentation' },
        { name: 'Data Wrangling Course', url: '#', type: 'course' },
      ],
      milestones: [
        'Complete data cleaning project with real-world dataset',
        'Implement efficient data processing pipelines',
        'Master advanced Pandas operations'
      ]
    },
    {
      id: 2,
      duration: 'Weeks 4-6',
      title: 'Machine Learning Fundamentals',
      description: 'Learn core ML algorithms and understand the mathematics behind them.',
      status: 'inProgress',
      estimatedHours: 40,
      priority: 'High',
      resources: [
        { name: 'Introduction to Statistical Learning', url: '#', type: 'book' },
        { name: 'Scikit-learn Documentation', url: '#', type: 'documentation' },
        { name: 'ML Mathematics Course', url: '#', type: 'course' },
      ],
      milestones: [
        'Implement ML algorithms from scratch',
        'Complete Kaggle competition with Scikit-learn',
        'Understand bias-variance tradeoff in practice'
      ]
    },
    // Additional AI/ML roadmap items would go here
  ],
  'quantum-researcher': [
    {
      id: 1,
      duration: 'Weeks 1-4',
      title: 'Quantum Mechanics Fundamentals',
      description: 'Build a strong foundation in quantum physics principles and mathematical formalism.',
      status: 'completed',
      estimatedHours: 50,
      priority: 'High',
      resources: [
        { name: 'Quantum Computing for Everyone', url: '#', type: 'book' },
        { name: 'Linear Algebra Review', url: '#', type: 'course' },
        { name: 'Quantum Physics Lectures', url: '#', type: 'video' },
      ],
      milestones: [
        'Master Dirac notation and Hilbert spaces',
        'Understand quantum superposition and entanglement',
        'Solve basic quantum mechanics problems'
      ]
    },
    // Additional Quantum roadmap items would go here
  ]
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const Roadmap = () => {
  const [selectedRole, setSelectedRole] = useState('frontend-developer');
  const currentRoadmap = mockRoadmapData[selectedRole];
  
  // Calculate roadmap statistics
  const completedItems = currentRoadmap.filter(item => item.status === 'completed').length;
  const inProgressItems = currentRoadmap.filter(item => item.status === 'inProgress').length;
  const todoItems = currentRoadmap.filter(item => item.status === 'todo').length;
  const totalHours = currentRoadmap.reduce((sum, item) => sum + item.estimatedHours, 0);
  const completedHours = currentRoadmap
    .filter(item => item.status === 'completed')
    .reduce((sum, item) => sum + item.estimatedHours, 0);
  
  const progressData = [
    { name: 'Completed', value: completedItems, color: '#10b981' },
    { name: 'In Progress', value: inProgressItems, color: '#3b82f6' },
    { name: 'To Do', value: todoItems, color: '#9ca3af' },
  ];
  
  const hoursData = [
    { name: 'Completed', hours: completedHours, fill: '#10b981' },
    { name: 'Remaining', hours: totalHours - completedHours, fill: '#e5e7eb' },
  ];
  
  const priorityData = [
    { name: 'High', value: currentRoadmap.filter(item => item.priority === 'High').length },
    { name: 'Medium', value: currentRoadmap.filter(item => item.priority === 'Medium').length },
    { name: 'Low', value: currentRoadmap.filter(item => item.priority === 'Low').length },
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <FaCheckCircle className="text-green-500" />;
      case 'inProgress':
        return <FaSpinner className="text-blue-500 animate-spin" />;
      case 'todo':
        return <FaCircle className="text-gray-400" />;
      default:
        return null;
    }
  };

  const getStatusBorderColor = (status) => {
    switch (status) {
      case 'completed':
        return 'border-green-500';
      case 'inProgress':
        return 'border-blue-500';
      case 'todo':
        return 'border-gray-300';
      default:
        return 'border-gray-300';
    }
  };

  const getResourceIcon = (type) => {
    switch (type) {
      case 'documentation':
        return <FaBook className="text-blue-500" />;
      case 'tutorial':
        return <FaLink className="text-purple-500" />;
      case 'course':
        return <FaVideo className="text-red-500" />;
      case 'project':
        return <FaProjectDiagram className="text-green-500" />;
      case 'book':
        return <FaBook className="text-yellow-500" />;
      default:
        return <FaLink className="text-gray-500" />;
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      className="p-6 pl-64 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 min-h-screen"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h1 variants={itemVariants} className="text-3xl font-bold text-gray-800 mb-2">
        Your Personalized Learning Roadmap
      </motion.h1>
      <motion.p variants={itemVariants} className="text-gray-600 mb-8">
        Based on your skill gaps, here's a step-by-step plan to achieve your career goals.
      </motion.p>

      {/* Role Selection */}
      <motion.div variants={itemVariants} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 mb-8">
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Select Career Path</h2>
            <p className="text-gray-600">Choose a role to view the customized learning path</p>
          </div>
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="px-4 py-3 rounded-lg border text-black border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full md:w-64"
          >
            <option value="frontend-developer">Frontend Developer</option>
            <option value="ai-ml-engineer">AI/ML Engineer</option>
            <option value="quantum-researcher">Quantum Computing Researcher</option>
          </select>
        </div>
      </motion.div>

      {/* Stats Overview */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex flex-col items-center text-center">
          <div className="p-3 bg-blue-100 rounded-full mb-3">
            <FaTasks className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-gray-500 font-semibold">Total Milestones</h3>
          <p className="text-2xl font-bold text-gray-800">{currentRoadmap.length}</p>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex flex-col items-center text-center">
          <div className="p-3 bg-green-100 rounded-full mb-3">
            <FaCheckCircle className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="text-gray-500 font-semibold">Completed</h3>
          <p className="text-2xl font-bold text-gray-800">{completedItems}</p>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex flex-col items-center text-center">
          <div className="p-3 bg-yellow-100 rounded-full mb-3">
            <FaClock className="w-6 h-6 text-yellow-600" />
          </div>
          <h3 className="text-gray-500 font-semibold">Estimated Hours</h3>
          <p className="text-2xl font-bold text-gray-800">{totalHours}</p>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex flex-col items-center text-center">
          <div className="p-3 bg-purple-100 rounded-full mb-3">
            <FaChartLine className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="text-gray-500 font-semibold">Progress</h3>
          <p className="text-2xl font-bold text-gray-800">{Math.round((completedItems / currentRoadmap.length) * 100)}%</p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Progress Charts */}
        <motion.div variants={itemVariants} className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Roadmap Progress</h3>
            <div style={{ width: '100%', height: 200 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={progressData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {progressData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Hours Completion</h3>
            <div style={{ width: '100%', height: 200 }}>
              <ResponsiveContainer>
                <RadialBarChart
                  innerRadius="20%"
                  outerRadius="100%"
                  data={hoursData}
                  startAngle={180}
                  endAngle={0}
                >
                  <PolarAngleAxis type="number" domain={[0, totalHours]} angleAxisId={0} tick={false} />
                  <RadialBar
                    background={{ fill: '#f3f4f6' }}
                    dataKey="hours"
                    angleAxisId={0}
                    cornerRadius={8}
                  />
                  <Legend />
                  <Tooltip />
                </RadialBarChart>
              </ResponsiveContainer>
            </div>
            <div className="text-center mt-2">
              <p className="text-sm text-gray-600">{completedHours} of {totalHours} hours completed</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Priority Distribution</h3>
            <div style={{ width: '100%', height: 200 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={priorityData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}`}
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
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.div>

        {/* Timeline */}
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Learning Path</h2>
            
            {/* Timeline Container */}
            <div className="relative border-l-2 border-gray-200 ml-6">
              {currentRoadmap.map((item, index) => (
                <motion.div 
                  key={item.id} 
                  className="mb-10 ml-6"
                  variants={itemVariants}
                >
                  {/* Timeline Icon */}
                  <span className="absolute -left-[13px] flex items-center justify-center w-6 h-6 bg-white rounded-full ring-8 ring-white">
                    {getStatusIcon(item.status)}
                  </span>

                  {/* Timeline Content Card */}
                  <div className={`p-6 bg-white rounded-lg shadow-md border-t-4 ${getStatusBorderColor(item.status)} hover:shadow-lg transition-all duration-300`}>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-3">
                      <p className="text-sm font-semibold text-gray-500 flex items-center">
                        <FaCalendar className="mr-2" /> {item.duration}
                      </p>
                      <div className="flex items-center">
                        <FaClock className="mr-2 text-gray-400" />
                        <span className="text-sm text-gray-500">{item.estimatedHours} hours</span>
                        <span className={`ml-3 px-2 py-1 rounded-full text-xs font-medium ${
                          item.priority === 'High' ? 'bg-red-100 text-red-800' : 
                          item.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-green-100 text-green-800'
                        }`}>
                          {item.priority} Priority
                        </span>
                      </div>
                    </div>
                    
                    <h2 className="text-xl font-bold my-2 text-gray-800">{item.title}</h2>
                    <p className="text-gray-700 mb-4">{item.description}</p>
                    
                    {/* Milestones */}
                    <div className="mb-4">
                      <h4 className="font-semibold mb-2 flex items-center">
                        <FaCertificate className="mr-2 text-green-500" /> Key Milestones
                      </h4>
                      <ul className="space-y-1">
                        {item.milestones.map((milestone, idx) => (
                          <li key={idx} className="text-sm text-gray-600 flex items-start">
                            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                            {milestone}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    {/* Resources */}
                    <div>
                      <h4 className="font-semibold mb-2 flex items-center">
                        <FaBook className="mr-2 text-blue-500" /> Recommended Resources
                      </h4>
                      <ul className="space-y-2">
                        {item.resources.map((resource, idx) => (
                          <li key={idx}>
                            <a 
                              href={resource.url} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="flex items-center text-gray-700 hover:text-blue-600 transition-colors"
                            >
                              <span className="mr-2">{getResourceIcon(resource.type)}</span>
                              {resource.name}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Roadmap;