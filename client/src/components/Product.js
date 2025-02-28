import React from "react";
import { useSelector } from "react-redux"; // Import useSelector to access Redux state

function Product({ product, addToCart }) {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated); // Access authentication state

  const handleAddToCart = () => {
    if (isAuthenticated) {
      addToCart(product); // Allow adding to cart if logged in
    } else {
      alert("Please log in to add items to the cart."); // Alert if not logged in
    }
  };

  return (
    <div className="product-card">
      <h2>{product.name}</h2>
      <p>Price: ${product.price}</p>
      <p>Discount: {product.discount}%</p>
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
}

export default Product;
