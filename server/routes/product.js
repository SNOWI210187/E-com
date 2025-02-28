const express = require("express");
const Product = require("../models/Product");
const authenticate = require("../middleware/authenticate"); // Authentication middleware
const authorizeAdmin = require("../middleware/authorizeAdmin"); // Admin authorization middleware
const router = express.Router();

// Add a new product (Admin only)
router.post("/", authenticate, authorizeAdmin, async (req, res) => {
  try {
    const { name, description, price, discount, stock } = req.body;
    const newProduct = new Product({
      name,
      description,
      price,
      discount,
      stock,
    });
    await newProduct.save();
    res.status(201).json({ message: "Product added successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a product (Admin only)
router.put("/:id", authenticate, authorizeAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a product (Admin only)
router.delete("/:id", authenticate, authorizeAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
