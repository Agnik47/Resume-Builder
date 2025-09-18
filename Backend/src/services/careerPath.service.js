const axios = require('axios');

const generateRoadmap = async (userData) => {
    try {
   
        const mlServiceUrl = process.env.CAREER_PATH_ML_URL || 'http://localhost:8002/generate-roadmap';

        const payload = {
            user_data: {
                skills: userData.skills,
                experience: userData.experience
            }
        };

        const response = await axios.post(mlServiceUrl, payload);
        
        // The service returns the structured roadmap data.
        return response.data;

    } catch (error) {
        console.error("Error calling AI/ML career path service:", error.message);
        throw new Error("Failed to generate career path.");
    }
};

module.exports = {
    generateRoadmap,
};