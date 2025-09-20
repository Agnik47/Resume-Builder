import React from 'react';
import { FaCheckCircle, FaSpinner, FaCircle, FaLink } from 'react-icons/fa';

// --- Mock Data ---
// This data simulates a personalized roadmap generated after analyzing a resume
// for a Frontend Developer role.
const mockRoadmapData = [
  {
    id: 1,
    duration: 'Weeks 1-2',
    title: 'Strengthen CSS & Tailwind Fundamentals',
    description: 'Deepen your understanding of modern CSS, including Flexbox, Grid, and advanced responsive design techniques with Tailwind CSS.',
    status: 'completed',
    resources: [
      { name: 'Tailwind Labs Official Docs', url: '#' },
      { name: 'CSS-Tricks Flexbox Guide', url: '#' },
    ],
  },
  {
    id: 2,
    duration: 'Weeks 3-5',
    title: 'Master Advanced React Concepts',
    description: 'Move beyond the basics. Focus on Hooks, Context API for state management, and performance optimization with memoization.',
    status: 'inProgress',
    resources: [
      { name: 'React Official Docs (Advanced)', url: '#' },
      { name: 'Build a complex project with Hooks', url: '#' },
    ],
  },
  {
    id: 3,
    duration: 'Weeks 6-7',
    title: 'Learn TypeScript',
    description: 'Integrate TypeScript into your React projects to add static typing, reduce bugs, and improve code maintainability.',
    status: 'todo',
    resources: [
      { name: 'TypeScript Handbook', url: '#' },
      { name: 'React TypeScript Cheatsheet', url: '#' },
    ],
  },
  {
    id: 4,
    duration: 'Week 8',
    title: 'Explore Testing with Jest & RTL',
    description: 'Learn to write unit and integration tests for your React components using Jest and React Testing Library (RTL).',
    status: 'todo',
    resources: [
      { name: 'React Testing Library Docs', url: '#' },
    ],
  },
];

const Roadmap = () => {
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

  return (
    <div className="p-4  pl-64">
      <h1 className="text-3xl font-bold mb-2">Your Personalized Roadmap</h1>
      <p className="text-gray-600 mb-8">
        Based on your resume, here is a step-by-step plan to become a job-ready Frontend Developer.
      </p>

      {/* --- Timeline Container --- */}
      <div className="relative border-l-2 border-gray-200 ml-6">
        {mockRoadmapData.map((item, index) => (
          <div key={item.id} className="mb-10 ml-12">
            {/* --- Timeline Icon --- */}
            <span className="absolute -left-[13px] flex items-center justify-center w-6 h-6 bg-white rounded-full ring-8 ring-white">
              {getStatusIcon(item.status)}
            </span>

            {/* --- Timeline Content Card --- */}
            <div className={`p-6 bg-white rounded-lg shadow-md border-t-4 ${getStatusBorderColor(item.status)}`}>
              <p className="text-sm font-semibold text-gray-500">{item.duration}</p>
              <h2 className="text-xl font-bold my-1">{item.title}</h2>
              <p className="text-gray-700 mb-4">{item.description}</p>
              
              {/* --- Resources --- */}
              <div>
                <h4 className="font-semibold mb-2">Recommended Resources:</h4>
                <ul className="space-y-1">
                  {item.resources.map(resource => (
                    <li key={resource.name}>
                      <a href={resource.url} target="_blank" rel="noopener noreferrer" className="flex items-center text-blue-600 hover:underline">
                        <FaLink className="mr-2 text-sm" />
                        {resource.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
       
    </div>
  );
};

export default Roadmap;