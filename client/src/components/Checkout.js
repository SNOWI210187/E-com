import React, { useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from "../features/cart/cartSlice"; // Adjust the import path as needed

// Load your Stripe publishable key
const stripePromise = loadStripe("your-publishable-key-here");

function Checkout() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items); // Access cart items from Redux state

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * (1 - item.discount / 100),
    0
  );

  return (
    <div className="checkout">
      <h1>Checkout</h1>
      <p>Total Amount: ${totalAmount.toFixed(2)}</p>
      <h2>Cart Items:</h2>
      <ul>
        {cart.map((item) => (
          <li key={item.productId}>
            {item.name} - Quantity: {item.quantity} - Price: ${item.price}
          </li>
        ))}
      </ul>
      <Elements stripe={stripePromise}>
        <CheckoutForm totalAmount={totalAmount} />
      </Elements>
    </div>
  );
}

export default Checkout;
