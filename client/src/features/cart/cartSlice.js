import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk for fetching cart data
export const fetchCart = createAsyncThunk("cart/fetchCart", async () => {
  const response = await fetch("/api/cart", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`, // Use the correct token key
    },
  }); // Adjust the URL as needed

  if (!response.ok) {
    throw new Error("Failed to fetch cart");
  }
  return response.json();
});

const initialState = {
  items: [],
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { productId, name, price, quantity } = action.payload;
      const existingItem = state.items.find(
        (item) => item.productId === productId
      );
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({ productId, name, price, quantity });
      }
    },
    removeFromCart: (state, action) => {
      const { productId } = action.payload;
      state.items = state.items.filter((item) => item.productId !== productId);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload; // Assuming the response directly returns the cart items
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
