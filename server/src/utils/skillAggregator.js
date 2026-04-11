exports.aggregateSkills = (projects) => {
  let allSkills = [];

  projects.forEach((project) => {
    if (project.extractedSkills) {
      allSkills.push(...project.extractedSkills);
    }

    if (project.techStack) {
      allSkills.push(...project.techStack);
    }
  });

  // remove duplicates
  const uniqueSkills = [...new Set(allSkills.map((s) => s.toLowerCase()))];

  return uniqueSkills;
};
