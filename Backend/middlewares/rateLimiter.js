const rateLimit = require("express-rate-limit");
const { RateLimiterMemory } = require("rate-limiter-flexible");

const userRateLimit = new RateLimiterMemory({
  points: 5, // max 5 login attempts
  duration: 60, // within 60 seconds
});

// Custom login rate limiter using the email as the key
const loginLimiter = async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required." });
  }

  try {
    // Check if the user exceeded the rate limit
    await userRateLimit.consume(email); // Using email as the unique key for rate-limiting

    // Proceed to the next middleware if within limit
    next();
  } catch (err) {
    // If the user exceeded the rate limit
    return res.status(429).json({
      error: "Too many login attempts. Try again after 1 minute.",
    });
  }
};

module.exports = { loginLimiter };
