const express = require("express");
const fetch = require("node-fetch");
const authenticateToken = require("../middlewares/auth"); // import authenticateToken
const router = express.Router();

// Fetch Swiggy restaurant data
router.get("/restaurants", authenticateToken, async (req, res) => {
  try {
    const response = await fetch(process.env.SWIGGY_RESTAURANT_LIST, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Mobile Safari/537.36",
        Accept: "*/*",
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to fetch Swiggy data", err: err.message });
  }
});

// Fetch Menu for a specific restaurant by ID
router.get("/menu/:resId", authenticateToken, async (req, res) => {
  const { resId } = req.params;

  try {
    const response = await fetch(process.env.MENU_API + resId, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36",
        Accept: "application/json",
      },
    });

    const data = await response.json();
    res.status(200).json(data.data); // Assuming the menu data is inside `data.data`
  } catch (error) {
    console.error("Error fetching menu:", error);
    res.status(500).json({ error: "Failed to fetch restaurant menu" });
  }
});

module.exports = router;
