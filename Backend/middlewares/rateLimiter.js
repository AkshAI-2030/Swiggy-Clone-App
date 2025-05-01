const rateLimit = require("express-rate-limit");

const loginLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  message: { error: "Too many login attempts. Try again after 2 minutes." },
  standardHeaders: true,
  legacyHeaders: false,
});

const githubLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 30,
  message: "Too many requests to GITHUB API. Please try again later.",
});

module.exports = { loginLimiter, githubLimiter };
