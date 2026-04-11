const axios = require("axios");

// ✅ safer URL parser
const parseGitHubUrl = (url) => {
  try {
    const cleanUrl = url.replace("https://", "").replace("http://", "");
    const parts = cleanUrl.split("github.com/")[1].split("/");

    return {
      owner: parts[0],
      repo: parts[1],
    };
  } catch {
    return null;
  }
};

exports.getRepoData = async (repoUrl) => {
  const parsed = parseGitHubUrl(repoUrl);

  if (!parsed) return null;

  const { owner, repo } = parsed;

  try {
    // ✅ README
    const readmeRes = await axios.get(
      `https://api.github.com/repos/${owner}/${repo}/readme`,
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
        },
      },
    );

    const readme = Buffer.from(readmeRes.data.content, "base64").toString();

    // ✅ package.json (optional)
    let packageJson = "";
    try {
      const pkgRes = await axios.get(
        `https://api.github.com/repos/${owner}/${repo}/contents/package.json`,
      );

      packageJson = Buffer.from(pkgRes.data.content, "base64").toString();
    } catch {
      // ignore if not exists
    }

    return { readme, packageJson };
  } catch (err) {
    console.log("❌ GitHub API error:", err.message);
    return null;
  }
};
