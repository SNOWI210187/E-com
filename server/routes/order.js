const express = require("express");
const Order = require("../models/Order");
const authenticate = require("../middleware/authenticate"); // Authentication middleware
const router = express.Router();

// Place a new order
router.post("/", authenticate, async (req, res) => {
  try {
    const { items, total } = req.body;

    // Create a new order using the authenticated user's ID
    const newOrder = new Order({
      userId: req.user.id, // Fetch userId from the authenticated user (set by authenticate middleware)
      items,
      total,
    });

    await newOrder.save();
    res.status(201).json({ message: "Order placed successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get orders by user ID
router.get("/:userId", authenticate, async (req, res) => {
  try {
    const { userId } = req.params;

    // Ensure the authenticated user can only access their own orders
    if (userId !== req.user.id.toString()) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const orders = await Order.find({ userId });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
