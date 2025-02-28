const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true }, // URL of the product image
  stock: { type: Number, default: 10 },
});

module.exports = mongoose.model("Product", productSchema);
