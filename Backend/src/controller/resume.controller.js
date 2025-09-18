const Resume = require('../models/resume.model.js');
const parseResume = require('../services/parsingOrchestrator.service.js');

// Controller function to handle resume upload
const uploadResume = async (req, res) => {
    try {
        const userId = req.user._id;
        const {fileContent } = req.body;
        
        if (!userId || !fileContent) {
            return res.status(400).json({ message: 'User ID and file content are required.' });
        }

        // Call the parsing service to get structured data from the resume content
        const parsedResumeData = await parseResume(fileContent);

        // Create a new resume document in the database
        const newResume = await Resume.create({
            userId,
            ...parsedResumeData
        });

        res.status(201).json({ 
            message: 'Resume uploaded and parsed successfully!', 
            resume: newResume 
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getSkillGap = async (req, res) => {
    try {
        const { userId, targetSkills } = req.body;

        if (!userId || !targetSkills || !Array.isArray(targetSkills)) {
            return res.status(400).json({ message: 'User ID and target skills (array) are required.' });
        }

        // Fetch the user's resume from the database
        const userResume = await Resume.findOne({ userId: userId }).select('skills');

        if (!userResume) {
            return res.status(404).json({ message: 'User resume not found.' });
        }

        // Call the matching service to perform the analysis
        const analysisResult =getSkillGapService(
            userResume.skills.map(s => s.toLowerCase()),
            targetSkills.map(s => s.toLowerCase())
        );

        res.status(200).json(analysisResult);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller function to get all resumes for a specific user
const getUserResumes = async (req, res) => {
    try {
        const userId = req.user._id;
        
        // Find all resumes associated with the given userId
        const resumes = await Resume.find({ userId: userId }).populate('userId', 'username email');
        
        if (resumes.length === 0) {
            return res.status(404).json({ message: 'No resumes found for this user.' });
        }
        
        res.status(200).json(resumes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller function to get a single resume by its ID
const getResumeById = async (req, res) => {
    try {
        const resume = await Resume.findById(req.params.resumeId).populate('userId', 'username email');
        
        if (!resume) {
            return res.status(404).json({ message: 'Resume not found.' });
        }
        
        res.status(200).json(resume);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller function to delete a resume by its ID
const deleteResume = async (req, res) => {
    try {
        const result = await Resume.findByIdAndDelete(req.params.resumeId);
        
        if (!result) {
            return res.status(404).json({ message: 'Resume not found.' });
        }
        
        res.status(200).json({ message: 'Resume deleted successfully.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller function to update a resume
const updateResume = async (req, res) => {
    try {
        const updatedResume = await Resume.findByIdAndUpdate(
            req.params.resumeId, 
            req.body, 
            { new: true, runValidators: true }
        );
        
        if (!updatedResume) {
            return res.status(404).json({ message: 'Resume not found.' });
        }
        
        res.status(200).json({ 
            message: 'Resume updated successfully.', 
            resume: updatedResume 
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    uploadResume,
    getUserResumes,
    getResumeById,
    deleteResume,
    updateResume,
    getSkillGap,
};