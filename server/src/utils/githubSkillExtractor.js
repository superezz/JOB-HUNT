exports.extractSkillsFromRepo = ({ readme, packageJson }) => {
  const text = (readme + " " + packageJson).toLowerCase();

  const skills = [
    "react",
    "node",
    "node.js",
    "express",
    "mongodb",
    "mongoose",
    "docker",
    "aws",
    "next",
    "next.js",
    "typescript",
    "javascript",
    "python",
    "java",
    "rest api",
    "graphql",
    "tailwind",
    "redux",
  ];

  const found = skills.filter((skill) => text.includes(skill));

  // ✅ remove duplicates (node + node.js issue)
  return [...new Set(found)];
};
