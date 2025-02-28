import React, { useEffect, useState } from "react";
import api from "../api/axiosInstance"; // Axios instance with token setup
import "./Home.css"; // Import the new CSS file

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await api.get("/api/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleAddToCart = async (product) => {
    const token = localStorage.getItem("token"); // Ensure the correct token key is used
    if (!token) {
      console.error("User is not authenticated");
      alert("Please log in to add items to your cart.");
      return;
    }

    try {
      const response = await api.post(
        "/api/cart/add",
        {
          productId: product._id, // Pass the product ID
          quantity: 1, // Adjust quantity as needed
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the request headers
          },
        }
      );
      console.log("Product added to cart:", response.data);
      // Optionally, you can update the cart state here or notify the user
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  return (
    <div className="home-container">
      {products.map((product) => (
        <div key={product._id} className="product-card">
          <img
            src={product.image}
            alt={product.name}
            className="product-image"
          />
          <h3 className="product-name">{product.name}</h3>
          <p className="product-description">{product.description}</p>
          <p className="product-price">${product.price.toFixed(2)}</p>
          <button
            onClick={() => handleAddToCart(product)}
            className="add-to-cart-btn"
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
};

export default Home;
