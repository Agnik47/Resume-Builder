import React from 'react'
import { FaTools } from "react-icons/fa";
import { motion } from "framer-motion";


const InterviewMentor = () => {
    
  return (
        <div className="pl-64 h-screen flex flex-col justify-center items-center bg-white text-gray-800">
          {/* Animated Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1, rotate: 360 }}
            transition={{ duration: 1 }}
            className="mb-6 text-blue-600"
          >
            <FaTools size={80} />
          </motion.div>
    
          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-4xl font-bold mb-4"
          >
            🚧 Under Construction 🚧
          </motion.h1>
    
          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="text-lg text-gray-600 mb-8 text-center max-w-md"
          >
            We’re working hard to bring you awesome resources. Stay tuned!
          </motion.p>
    
          {/* Button */}
          <motion.a
            href="/dashboard"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition"
          >
            Back to Dashboard
          </motion.a>
        </div>
    
  )
}

export default InterviewMentor