const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  quantity: { type: Number, required: true },
});

const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [cartItemSchema],
});

module.exports = mongoose.model("Cart", cartSchema);
