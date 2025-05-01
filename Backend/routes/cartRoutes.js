const express = require("express");
const { Cart } = require("../models/cart");
const authenticateToken = require("../middlewares/auth");

const router = express.Router();

// Save Cart
router.post("/cart/save", authenticateToken, async (req, res) => {
  const userId = req.user.id;
  const newItems = req.body.items;

  try {
    const cart = await Cart.findOne({ userId });

    if (cart) {
      newItems.forEach((newItem) => {
        const existing = cart.items.find(
          (i) => i.itemName === newItem.itemName
        );
        if (existing) {
          existing.quantity += newItem.quantity;
          existing.savedAt = new Date();
        } else {
          cart.items.push({ ...newItem, savedAt: new Date() });
        }
      });
      await cart.save();
      res.status(200).json({ message: "Cart updated" });
    } else {
      await Cart.create({
        userId,
        items: newItems.map((item) => ({ ...item, savedAt: new Date() })),
      });
      res.status(201).json({ message: "Cart created" });
    }
  } catch (err) {
    res.status(500).json({ error: "Cart save failed", detail: err.message });
  }
});

// Fetch Cart
router.get("/cart/user/:userId", authenticateToken, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    if (!cart || cart.items.length === 0)
      return res.status(200).json({ items: [] });

    res.status(200).json({ items: cart.items });
  } catch (err) {
    res.status(500).json({ error: "Cart fetch failed", detail: err.message });
  }
});

module.exports = router;
