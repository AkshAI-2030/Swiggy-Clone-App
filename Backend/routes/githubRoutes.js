const express = require("express");
const { githubLimiter } = require("../middlewares/rateLimiter");
const { githubCache, CACHE_DURATION } = require("../middlewares/cache");

const router = express.Router();
const username = "AkshAI-2030";

// GitHub Profile
router.get("/profile", githubLimiter, async (req, res) => {
  const now = Date.now();

  if (
    githubCache.profile &&
    now - githubCache.profileFetchedAt < CACHE_DURATION
  ) {
    return res.json(githubCache.profile);
  }

  try {
    const response = await fetch(`https://api.github.com/users/${username}`);
    const data = await response.json();
    githubCache.profile = data;
    githubCache.profileFetchedAt = now;
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "GitHub profile fetch failed" });
  }
});

// GitHub Repos
router.get("/repos", githubLimiter, async (req, res) => {
  const now = Date.now();

  if (githubCache.repos && now - githubCache.reposFetchedAt < CACHE_DURATION) {
    return res.json(githubCache.repos);
  }

  try {
    const response = await fetch(
      `https://api.github.com/users/${username}/repos?per_page=100`
    );
    const data = await response.json();
    githubCache.repos = data;
    githubCache.reposFetchedAt = now;
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "GitHub repos fetch failed" });
  }
});

module.exports = router;
