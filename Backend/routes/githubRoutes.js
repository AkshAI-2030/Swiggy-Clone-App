// routes/githubRoutes.js
const express = require("express");
const router = express.Router();
const { getUserProfile, getRepos } = require("../controllers/githubController");
const { githubCache, CACHE_DURATION } = require("../middlewares/cache");

// GET /api/v1/profile
router.get("/profile", async (req, res) => {
  const now = Date.now();

  if (
    githubCache.profile &&
    now - githubCache.profileFetchedAt < CACHE_DURATION
  ) {
    return res.json(githubCache.profile);
  }

  try {
    const profileData = await getUserProfile();
    githubCache.profile = profileData;
    githubCache.profileFetchedAt = now;
    res.json(profileData);
  } catch (err) {
    console.error("Error fetching profile:", err.message);
    res.status(500).json({ error: "Failed to fetch GitHub profile" });
  }
});

// GET /api/v1/repos
router.get("/repos", async (req, res) => {
  const now = Date.now();

  if (githubCache.repos && now - githubCache.reposFetchedAt < CACHE_DURATION) {
    return res.json(githubCache.repos);
  }

  try {
    const reposData = await getRepos();
    githubCache.repos = reposData;
    githubCache.reposFetchedAt = now;
    res.json(reposData);
  } catch (err) {
    console.error("Error fetching repos:", err.message);
    res.status(500).json({ error: "Failed to fetch GitHub repositories" });
  }
});

module.exports = router;
