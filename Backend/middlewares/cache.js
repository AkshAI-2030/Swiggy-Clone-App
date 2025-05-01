const githubCache = {
  profile: null,
  repos: null,
  profileFetchedAt: 0,
  reposFetchedAt: 0,
};

const CACHE_DURATION = 5 * 60 * 1000; // 5 min

module.exports = { githubCache, CACHE_DURATION };
