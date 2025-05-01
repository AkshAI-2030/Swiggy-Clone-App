const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models/user");
const { loginLimiter } = require("../middlewares/rateLimiter");
const authenticateToken = require("../middlewares/auth");

const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    if (!username || !email || !password)
      return res.status(400).json({ message: "Missing required fields." });

    const emailExists = await User.findOne({ email });
    if (emailExists) return res.status(400).json({ message: "Email exists" });

    const userExists = await User.findOne({ username });
    if (userExists) return res.status(400).json({ message: "Username exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Register error", error: err });
  }
});

// Login
router.post("/login", loginLimiter, async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: "Missing credentials" });

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "Email doesn't exist" });

    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return res.status(400).json({ message: "Password didn't match" });

    const token = jwt.sign(
      { id: user._id, username: user.username, email: user.email },
      process.env.JWT_SECRET
    );

    res.status(200).json({ message: "Login successful", token });
  } catch (err) {
    res.status(500).json({ message: "Login error", error: err });
  }
});

// Get logged-in user
router.get("/user", authenticateToken, (req, res) => {
  const { username, email } = req.user;
  res.status(200).json({ username, email });
});

module.exports = router;
