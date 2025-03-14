import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: { cartItems: [], userId: null },
  reducers: {
    addToCart: (state, action) => {
      state.cartItems.push(action.payload);
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(items => action.payload.id !== items.id);
    },
    clearCart: (state) => {
      state.cartItems = [];
    },
    setUser: (state, action) => {
      state.userId = action.payload;
      const savedCart = localStorage.getItem(`cart_${state.userId}`);
      console.log(savedCart);
      state.cartItems = savedCart ? JSON.parse(savedCart) : [];
    }
  }
});

export const cartActions = cartSlice.actions;
export default cartSlice;