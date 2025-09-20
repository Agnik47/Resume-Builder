import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, FileText, CheckCircle, Zap, Target, TrendingUp } from 'lucide-react';

const ResumeUploadForm = ({ onAnalyze, status }) => {
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleAnalyzeClick = () => {
    onAnalyze(file);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, y: 30 }} 
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-2xl"
      >
        {/* Hero Section */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-6"
          >
            <FileText className="w-10 h-10 text-white" />
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-5xl font-bold bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600 bg-clip-text text-transparent mb-4"
          >
            Resume Analyzer
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-gray-600 mb-2"
          >
            Optimize your resume for ATS systems and land your dream job
          </motion.p>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-gray-500"
          >
            Get instant feedback, keyword analysis, and professional insights
          </motion.p>
        </div>

        {/* Upload Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white p-10 rounded-3xl shadow-xl border border-gray-200 backdrop-blur-sm"
        >
          <div
            className={`border-3 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ${
              dragActive 
                ? 'border-blue-400 bg-blue-50' 
                : file 
                ? 'border-green-400 bg-green-50' 
                : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input 
              type="file" 
              id="resume-upload" 
              className="hidden" 
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange} 
            />
            
            <motion.div
              initial={{ scale: 1 }}
              animate={{ scale: dragActive ? 1.1 : 1 }}
              transition={{ duration: 0.2 }}
            >
              {file ? (
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              ) : (
                <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              )}
            </motion.div>
            
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {file ? 'File Selected!' : 'Upload Your Resume'}
            </h3>
            
            <p className="text-gray-500 mb-6">
              {file 
                ? `${file.name} (${(file.size / 1024 / 1024).toFixed(2)} MB)`
                : 'Drag and drop your resume here, or click to browse'
              }
            </p>
            
            <label 
              htmlFor="resume-upload" 
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold py-3 px-8 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all cursor-pointer shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <Upload className="w-4 h-4" />
              Choose File
            </label>
            
            <p className="text-xs text-gray-400 mt-4">
              Supports PDF, DOC, DOCX files up to 10MB
            </p>
          </div>
          
          {/* Action Button */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-8"
          >
            <button 
              onClick={handleAnalyzeClick} 
              disabled={!file || status === 'loading'} 
              className={`w-full py-4 px-8 rounded-xl font-semibold text-lg transition-all duration-300 ${
                !file || status === 'loading'
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700 transform hover:-translate-y-1 shadow-lg hover:shadow-xl'
              }`}
            >
              {status === 'loading' ? (
                <div className="flex items-center justify-center gap-3">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Analyzing Your Resume...
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <Zap className="w-5 h-5" />
                  Analyze Resume
                </div>
              )}
            </button>
          </motion.div>
          
          {/* Features List */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 pt-8 border-t border-gray-200"
          >
            {[
              { icon: Target, title: "ATS Score", desc: "Get your resume's ATS compatibility score" },
              { icon: Zap, title: "Keyword Analysis", desc: "Identify missing and matching keywords" },
              { icon: TrendingUp, title: "Skill Insights", desc: "Analyze your skill distribution" }
            ].map((feature, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-100 rounded-lg mb-3">
                  <feature.icon className="w-6 h-6 text-gray-600" />
                </div>
                <h4 className="font-semibold text-gray-800 mb-1">{feature.title}</h4>
                <p className="text-sm text-gray-500">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ResumeUploadForm;
