import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get("/api/products");
      setProducts(response.data);
    };
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    await axios.delete(`/api/products/${id}`);
    setProducts(products.filter((product) => product._id !== id));
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <h2>Manage Products</h2>
      <ul>
        {products.map((product) => (
          <li key={product._id}>
            <span>
              {product.name} - ${product.price}
            </span>
            <button onClick={() => handleDelete(product._id)}>Delete</button>
            {/* You can add edit functionality here */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
