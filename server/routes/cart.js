const express = require("express");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const authenticate = require("../middleware/authenticate");

const router = express.Router();

// Add a product to the cart
router.post("/add", authenticate, async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user.id;

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    // Check if the product is already in the cart
    const existingItem = cart.items.find(
      (item) => item.product.toString() === productId
    );
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }

    await cart.save();
    res.status(201).json(cart); // Return updated cart
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Remove a product from the cart
router.delete("/remove", authenticate, async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.user.id;

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId
    );
    await cart.save();
    res.status(200).json(cart); // Return updated cart
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Fetch the cart for the authenticated user with populated product details
router.get("/", authenticate, async (req, res) => {
  try {
    const userId = req.user.id;
    const cart = await Cart.findOne({ userId }).populate("items.product"); // Populate product details

    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    res.status(200).json(cart); // Return the cart data
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
