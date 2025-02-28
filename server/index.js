const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const http = require("http");
const { initSocket } = require("./utils/socket"); // WebSocket logic
const productRoutes = require("./routes/product");
const cartRoutes = require("./routes/cart");
const authRoutes = require("./routes/auth"); // Authentication routes
const orderRoutes = require("./routes/order"); // Order routes

dotenv.config();
const app = express();
const server = http.createServer(app);

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const mongoURI = process.env.MONGO_URI;

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.error("MongoDB connection error:", error));

// Initialize WebSocket
initSocket(server);

// Routes
app.use("/api/products", productRoutes); // Product routes
app.use("/api/auth", authRoutes); // Authentication routes
app.use("/api/order", orderRoutes); // Order routes
app.use("/api/cart", cartRoutes); // Cart routes

// Root route
app.get("/", (req, res) => {
  res.send("Welcome to the E-commerce API");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong" });
});

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
