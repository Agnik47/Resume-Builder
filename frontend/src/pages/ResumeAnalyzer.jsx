import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, RadialBarChart, RadialBar, PolarAngleAxis } from 'recharts';
import { FaFileUpload, FaTrash, FaSync } from 'react-icons/fa';
import { setAnalysisLoading, setAnalysisSuccess, setAnalysisError } from '../store/resumeSlice';

// --- MOCK DATA ---
const mockApiResponse = {
  fileName: "JohnDoe_Resume.pdf",
  atsScore: 88,
  keywords: {
    matched: ['React', 'Node.js', 'JavaScript', 'SQL', 'Git'],
    missing: ['Docker', 'TypeScript', 'CI/CD', 'Jest'],
  },
  skillDistribution: [
    { name: 'Frontend', value: 70, fill: '#3b82f6' },
    { name: 'Backend', value: 20, fill: '#10b981' },
    { name: 'DevOps', value: 10, fill: '#f97316' },
  ],
};

// --- Child Components for the Dashboard ---

const AtsScoreCircle = ({ score }) => (
    <div style={{ width: '100%', height: 250 }}>
        <ResponsiveContainer>
            <RadialBarChart
                innerRadius="70%"
                outerRadius="85%"
                data={[{ value: score }]}
                startAngle={90}
                endAngle={-270}
            >
                <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
                <RadialBar
                    background
                    dataKey="value"
                    angleAxisId={0}
                    fill="#3b82f6"
                    cornerRadius={10}
                />
                <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" className="text-5xl font-bold fill-gray-700">
                    {score}%
                </text>
                 <text x="50%" y="65%" textAnchor="middle" dominantBaseline="middle" className="text-lg font-medium fill-gray-500">
                    ATS Score
                </text>
            </RadialBarChart>
        </ResponsiveContainer>
    </div>
);


const KeywordsPanel = ({ keywords }) => (
  <>
    <div>
        <h3 className="font-semibold text-gray-700 mb-2">Matching Keywords</h3>
        <div className="flex flex-wrap gap-2">
            {keywords.matched.map(kw => <span key={kw} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">{kw}</span>)}
        </div>
    </div>
    <div className="mt-4">
        <h3 className="font-semibold text-gray-700 mb-2">Missing Keywords</h3>
        <div className="flex flex-wrap gap-2">
            {keywords.missing.map(kw => <span key={kw} className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">{kw}</span>)}
        </div>
    </div>
  </>
);

const SkillDistributionChart = ({ data }) => (
    <div style={{ width: '100%', height: 250 }}>
        <ResponsiveContainer>
            <PieChart>
                <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                    {data.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.fill} />)}
                </Pie>
                <Legend />
            </PieChart>
        </ResponsiveContainer>
    </div>
);


// --- Main ResumeAnalyzer Component ---

const ResumeAnalyzer = () => {
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();
  const { analysis, status } = useSelector((state) => state.resume);

  const handleAnalyze = () => {
    if (!file) return;
    dispatch(setAnalysisLoading());
    setTimeout(() => {
      dispatch(setAnalysisSuccess(mockApiResponse));
    }, 1500);
  };
  
  // Render the dashboard if analysis is successful
  if (status === 'succeeded' && analysis) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Analysis Dashboard</h1>
            <div className="flex items-center gap-2">
                <span className="text-gray-600 font-medium">{analysis.fileName}</span>
                <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-gray-100 rounded-full transition-colors"><FaSync /></button>
                <button className="p-2 text-gray-500 hover:text-red-600 hover:bg-gray-100 rounded-full transition-colors"><FaTrash /></button>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div className="lg:col-span-1 bg-white p-6 rounded-xl shadow-sm border" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
            <AtsScoreCircle score={analysis.atsScore} />
          </motion.div>
          <motion.div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}>
            <h2 className="text-xl font-bold text-gray-800 mb-4">Keyword Analysis</h2>
            <KeywordsPanel keywords={analysis.keywords} />
          </motion.div>
          <motion.div className="lg:col-span-3 bg-white p-6 rounded-xl shadow-sm border" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }}>
             <h2 className="text-xl font-bold text-gray-800 mb-4">Skill Distribution</h2>
            <SkillDistributionChart data={analysis.skillDistribution} />
          </motion.div>
        </div>
      </motion.div>
    );
  }

  // Render the upload form initially or on loading/error
  return (
    <div className="flex items-center justify-center h-full">
      <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="w-full max-w-lg text-center">
        <div className="bg-white p-10 rounded-xl shadow-md border">
          <FaFileUpload className="mx-auto text-5xl text-blue-500 mb-4" />
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Upload Your Resume</h1>
          <p className="text-gray-500 mb-6">Get started by uploading your resume to unlock your personalized dashboard.</p>
          <input type="file" id="resume-upload" className="hidden" onChange={(e) => setFile(e.target.files[0])} />
          <label htmlFor="resume-upload" className="cursor-pointer bg-gray-100 text-gray-700 font-medium py-2 px-4 rounded-lg inline-block mb-4 hover:bg-gray-200 transition-colors">
            {file ? file.name : "Choose a file..."}
          </label>
          <button onClick={handleAnalyze} disabled={!file || status === 'loading'} className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed">
            {status === 'loading' ? 'Analyzing...' : 'Unlock Dashboard'}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ResumeAnalyzer;