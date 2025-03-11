import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: { cartItems: [] },
  reducers: {
    addToCart: (state, action) => {
      state.cartItems.push(action.payload);
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(items => action.payload.id !== items.id);
    },
  }
});

export const cartActions = cartSlice.actions;
export default cartSlice;