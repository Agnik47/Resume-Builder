const getSkillGapService=require('../services/matchSkills.service.js');

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