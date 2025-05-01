const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  items: [
    {
      itemName: String,
      quantity: Number,
      image: String,
      savedAt: { type: Date, default: Date.now },
    },
  ],
});

const Cart = mongoose.model("Cart", CartSchema);

module.exports = { Cart };
