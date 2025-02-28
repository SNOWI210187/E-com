import React from "react";
import { Link } from "react-router-dom";
import "./Header.css"; // Importing the updated CSS

function Header({ handleLogout }) {
  const token = localStorage.getItem("token");

  return (
    <header>
      <nav>
        {/* Logo or Brand Name */}
        <h2>E-Commerce</h2>

        {/* Navigation Links */}
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          {/* Conditional Rendering for Cart, Checkout, and Orders */}
          {token && (
            <>
              <li>
                <Link to="/cart">Cart</Link>
              </li>
              <li>
                <Link to="/checkout">Checkout</Link>
              </li>
              <li>
                <Link to="/orders">Orders</Link>
              </li>
            </>
          )}
          {/* Conditional Rendering for Login/Logout */}
          {!token ? (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/signup">Sign Up</Link>
              </li>
            </>
          ) : (
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
