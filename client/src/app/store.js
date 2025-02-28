import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cart/cartSlice"; // Adjust the path to your cart slice

const store = configureStore({
  reducer: {
    cart: cartReducer, // Add cart slice to the store
  },
});

export default store;
