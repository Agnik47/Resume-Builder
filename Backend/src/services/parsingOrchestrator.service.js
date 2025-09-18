const axios = require('axios'); 

const parseResume = async (resumeContent) => {
  try {
  
    const nlpServiceUrl = process.env.NLP_PARSING_URL || 'http://localhost:5000/parse';


    const payload = {
      resume_text: resumeContent
    };

    const response = await axios.post(nlpServiceUrl, payload);

    // Return the structured data received from their service
    return response.data;

  } catch (error) {
    console.error("Error calling NLP service:", error.response ? error.response.data : error.message);
    throw new Error("Failed to parse resume content. Check the NLP service.");
  }
};

module.exports=parseResume