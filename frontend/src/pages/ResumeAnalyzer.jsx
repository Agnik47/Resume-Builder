import React from 'react';
import { motion } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { setAnalysisLoading, setAnalysisSuccess, resetAnalysis } from '../store/resumeSlice';

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, RadialBarChart, RadialBar, PolarAngleAxis } from 'recharts';
import { FileText, Trash2, RefreshCw, CheckCircle, AlertCircle, TrendingUp, Target, Award, Zap } from 'lucide-react';
import ResumeUploadForm from '../components/Dashboard/ResumeUploadForm';


// --- MOCK API DATA ---
const mockApiResponse = {
  fileName: "JohnDoe_Resume.pdf",
  atsScore: 88,
  keywords: {
    matched: ['React', 'Node.js', 'JavaScript', 'SQL', 'Git', 'AWS', 'MongoDB', 'Express'],
    missing: ['Docker', 'TypeScript', 'CI/CD', 'Jest', 'Kubernetes'],
  },
  skillDistribution: [
    { name: 'Frontend', value: 45, fill: '#6366f1' },
    { name: 'Backend', value: 30, fill: '#10b981' },
    { name: 'Database', value: 15, fill: '#f59e0b' },
    { name: 'DevOps', value: 10, fill: '#ef4444' },
  ],
};


// --- Reusable Child Components for the Dashboard ---
// (These can be moved to their own files later if desired)

const AtsScoreCircle = ({ score }) => {
  const getScoreColor = (score) => {
    if (score >= 85) return '#10b981';
    if (score >= 70) return '#f59e0b';
    return '#ef4444';
  };

  const getScoreLabel = (score) => {
    if (score >= 85) return 'Excellent';
    if (score >= 70) return 'Good';
    return 'Needs Work';
  };

  return (
    <div className="relative">
      <div style={{ width: '100%', height: 280 }}>
        <ResponsiveContainer>
          <RadialBarChart
            innerRadius="60%"
            outerRadius="90%"
            data={[{ value: score, fill: getScoreColor(score) }]}
            startAngle={90}
            endAngle={-270}
          >
            <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
            <RadialBar
              background={{ fill: '#f3f4f6' }}
              dataKey="value"
              angleAxisId={0}
              cornerRadius={8}
            />
          </RadialBarChart>
        </ResponsiveContainer>
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-5xl font-bold text-gray-800">{score}%</div>
        <div className="text-sm font-medium text-gray-500 mt-1">ATS Score</div>
        <div className={`text-xs font-semibold mt-1 px-2 py-1 rounded-full ${
          score >= 85 ? 'bg-green-100 text-green-800' :
          score >= 70 ? 'bg-yellow-100 text-yellow-800' :
          'bg-red-100 text-red-800'
        }`}>
          {getScoreLabel(score)}
        </div>
      </div>
    </div>
  );
};

const KeywordsPanel = ({ keywords }) => (
    <div className="space-y-6">
    <div>
      <div className="flex items-center gap-2 mb-3">
        <CheckCircle className="w-5 h-5 text-green-600" />
        <h3 className="font-semibold text-gray-800">Matching Keywords ({keywords.matched.length})</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {keywords.matched.map((kw, index) => (
          <motion.span 
            key={kw} 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gradient-to-r from-green-50 to-green-100 text-green-800 px-3 py-2 rounded-lg text-sm font-medium border border-green-200 hover:from-green-100 hover:to-green-150 transition-all"
          >
            {kw}
          </motion.span>
        ))}
      </div>
    </div>
    
    <div>
      <div className="flex items-center gap-2 mb-3">
        <AlertCircle className="w-5 h-5 text-red-600" />
        <h3 className="font-semibold text-gray-800">Missing Keywords ({keywords.missing.length})</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {keywords.missing.map((kw, index) => (
          <motion.span 
            key={kw}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 + 0.3 }}
            className="bg-gradient-to-r from-red-50 to-red-100 text-red-800 px-3 py-2 rounded-lg text-sm font-medium border border-red-200 hover:from-red-100 hover:to-red-150 transition-all"
          >
            {kw}
          </motion.span>
        ))}
      </div>
    </div>
  </div>
);

const SkillDistributionChart = ({ data }) => (
  <div style={{ width: '100%', height: 300 }}>
    <ResponsiveContainer>
      <PieChart>
        <Pie 
          data={data} 
          dataKey="value" 
          nameKey="name" 
          cx="50%" 
          cy="50%" 
          outerRadius={100}
          innerRadius={60}
          paddingAngle={2}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.fill} />
          ))}
        </Pie>
        <Legend 
          verticalAlign="bottom" 
          height={36}
          formatter={(value, entry) => (
            <span style={{ color: entry.color, fontWeight: '500' }}>
              {value}
            </span>
          )}
        />
      </PieChart>
    </ResponsiveContainer>
  </div>
);

const StatsCard = ({ icon: Icon, title, value, change, color }) => (
  <motion.div 
    initial={{ y: 20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300"
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
        {change && (
          <p className={`text-xs mt-1 flex items-center gap-1 ${change > 0 ? 'text-green-600' : 'text-red-600'}`}>
            <TrendingUp className="w-3 h-3" />
            {change > 0 ? '+' : ''}{change}% from last scan
          </p>
        )}
      </div>
      <div className={`p-3 rounded-lg ${color}`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
    </div>
  </motion.div>
);


// --- Main ResumeAnalyzer Component ---

const ResumeAnalyzer = () => {
  const dispatch = useDispatch();
  const { status, analysis } = useSelector((state) => state.resume);

  const handleAnalyze = (file) => {
    if (!file) return;
    dispatch(setAnalysisLoading());
    setTimeout(() => {
      dispatch(setAnalysisSuccess(mockApiResponse));
    }, 2000);
  };

  const handleReset = () => {
    dispatch(resetAnalysis());
  };

  // If analysis is not successful, show the upload form
  if (status !== 'succeeded' || !analysis) {
    return <ResumeUploadForm onAnalyze={handleAnalyze} status={status} />;
  }

  // Otherwise, show the full dashboard
  return (
    <div className="min-h-screen pl-64 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto"
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              Resume Analysis Dashboard
            </h1>
            <p className="text-gray-600 mt-2">Comprehensive insights for your career success</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-gray-200">
              <FileText className="w-4 h-4 text-gray-500" />
              <span className="text-gray-700 font-medium text-sm">{analysis.fileName}</span>
            </div>
            <button 
              onClick={() => handleAnalyze(new File([], mockApiResponse.fileName))} // Pass a dummy file for re-analysis
              className="p-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
              title="Re-analyze"
            >
              <RefreshCw className="w-5 h-5" />
            </button>
            <button 
              onClick={handleReset}
              className="p-3 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
              title="Delete analysis"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatsCard 
            icon={Target}
            title="ATS Score"
            value={`${analysis.atsScore}%`}
            change={12}
            color="bg-gradient-to-r from-blue-500 to-blue-600"
          />
          <StatsCard 
            icon={CheckCircle}
            title="Keywords Matched"
            value={analysis.keywords.matched.length}
            change={5}
            color="bg-gradient-to-r from-green-500 to-green-600"
          />
          <StatsCard 
            icon={Award}
            title="Skills Identified"
            value={analysis.skillDistribution.length}
            color="bg-gradient-to-r from-purple-500 to-purple-600"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ATS Score */}
          <motion.div 
            className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition-all"
            initial={{ y: 20, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }} 
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Target className="w-5 h-5 text-blue-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-800">ATS Compatibility</h2>
            </div>
            <AtsScoreCircle score={analysis.atsScore} />
          </motion.div>

          {/* Keywords Analysis */}
          <motion.div 
            className="lg:col-span-2 bg-white p-8 rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition-all"
            initial={{ y: 20, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }} 
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-green-100 rounded-lg">
                <Zap className="w-5 h-5 text-green-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-800">Keyword Analysis</h2>
            </div>
            <KeywordsPanel keywords={analysis.keywords} />
          </motion.div>

          {/* Skill Distribution */}
          <motion.div 
            className="lg:col-span-3 bg-white p-8 rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition-all"
            initial={{ y: 20, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }} 
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-purple-100 rounded-lg">
                <TrendingUp className="w-5 h-5 text-purple-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-800">Skill Distribution</h2>
            </div>
            <SkillDistributionChart data={analysis.skillDistribution} />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default ResumeAnalyzer;
