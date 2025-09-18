

const formatForDashboard = (resumeData) => {
  if (!resumeData || !resumeData.skills || !resumeData.projects) {
    throw new Error("Invalid resume data provided for formatting.");
  }
  
  // Example: Count skills by category for a pie chart
  const skillsByCategory = resumeData.skills.reduce((acc, current) => {
    if (current.category in acc) {
      acc[current.category] += current.list.length;
    } else {
      acc[current.category] = current.list.length;
    }
    return acc;
  }, {});

  // Example: Count total projects
  const totalProjects = resumeData.projects.length;

  return {
    skillsBreakdown: skillsByCategory,
    projectsCount: totalProjects,
  };
};

module.exports=formatForDashboard