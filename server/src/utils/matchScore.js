exports.calculateMatchScore = (userSkills, jobSkills) => {
  const normalizedUserSkills = userSkills.map(s => s.toLowerCase());

  const matched = jobSkills.filter(skill =>
    normalizedUserSkills.includes(skill.toLowerCase())
  );

  const score = (matched.length / jobSkills.length) * 100;

  return {
    score: Math.round(score),
    matched,
    missing: jobSkills.filter(skill =>
      !normalizedUserSkills.includes(skill.toLowerCase())
    )
  };
};