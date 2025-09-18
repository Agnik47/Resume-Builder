const Resume = require('../models/resume.model');
const generateRoadmap  = require('../services/careerPath.service');

const getCareerPath = async (req, res) => {
    try {
        
        const userId=req.user._id

        // Fetch user's latest resume data from the database
        const userResume = await Resume.findOne({ userId: userId }).sort({ createdAt: -1 });

        if (!userResume) {
            return res.status(404).json({ message: 'User resume not found.' });
        }

        // Call the service to generate the roadmap
        const roadmap = await generateRoadmap(userResume);

        res.status(200).json({message:"Roadmap has successfully created",roadmap});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getCareerPath,
};