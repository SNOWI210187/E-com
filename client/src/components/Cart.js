import React, { useState, useEffect } from "react";
import api from "../api/axiosInstance"; // Axios instance with token setup
import "./Home.css"; // Importing Home.css for styling

const Cart = () => {
  const [cart, setCart] = useState([]);

  const fetchCart = async () => {
    try {
      const response = await api.get("/api/cart", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Use the correct token key
        },
      });
      setCart(response.data.items); // Ensure we set the cart items correctly
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const removeFromCart = async (productId) => {
    try {
      const response = await api.delete("/api/cart/remove", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Use the correct token key
        },
        data: { productId },
      });
      console.log("Removed from cart:", response.data);
      setCart(response.data.items); // Update cart after removal
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  };

  return (
    <div>
      <h3>Your Cart</h3>
      {cart.length > 0 ? (
        cart.map((item) => (
          <div
            key={item._id}
            className="product-card"
            style={{ marginBottom: "20px" }}
          >
            <img
              src={item.product.image}
              alt={item.product.name}
              className="product-image"
            />
            <p className="product-name">
              {item.product.name} - $
              {item.product.price ? item.product.price.toFixed(2) : "0.00"} x{" "}
              {item.quantity}
            </p>
            <button
              onClick={() => removeFromCart(item.product._id)}
              className="add-to-cart-btn"
            >
              Remove
            </button>
          </div>
        ))
      ) : (
        <p>Your cart is empty</p>
      )}
    </div>
  );
};

export default Cart;
