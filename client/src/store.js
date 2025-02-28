import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/cart/cartSlice";
import authReducer from "./features/auth/authSlice"; // Import the auth reducer

const store = configureStore({
  reducer: {
    cart: cartReducer, // Add cart reducer here
    auth: authReducer, // Add auth reducer here
  },
});

export default store;
