exports.aggregateSkills = (projects) => {
  let allSkills = [];

  projects.forEach((project) => {
    if (project.extractedSkills) {
      allSkills.push(...project.extractedSkills);
    }
  });

  // remove duplicates
  const uniqueSkills = [...new Set(allSkills)];

  return uniqueSkills;
};