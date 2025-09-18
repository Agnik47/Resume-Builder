const { matchResumeWithJob } = require("../services/matchJob.service");


const matchJob = async (req, res) => {
    try {
        const { resumeText, jobDescription } = req.body;
        
        if (!resumeText || !jobDescription) {
            return res.status(400).json({ message: "Resume text and job description are required." });
        }

        // Call the service to perform the matching logic
        const matchResult = await matchResumeWithJob(resumeText, jobDescription);

        res.status(200).json(matchResult);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    matchJob,
};