const axios = require('axios');

const matchResumeWithJob = async (resumeText, jobDescription) => {
    try {
    
        const mlServiceUrl = process.env.ML_SERVICE_URL || "http://localhost:8001";
        const endpoint = `${mlServiceUrl}/resume/match-job`;

        const payload = {
            resume_text: resumeText,
            job_description: jobDescription,
        };

        const response = await axios.post(endpoint, payload);

        return response.data;
    } catch (error) {
        console.error("Error matching resume with job:", error.response ? error.response.data : error.message);
        throw new Error("Failed to get match score from the ML service.");
    }
};

module.exports = {
    matchResumeWithJob,
};