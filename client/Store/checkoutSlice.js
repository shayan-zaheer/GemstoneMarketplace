import { createSlice } from "@reduxjs/toolkit";

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState: {
    checkoutItem: {}
  },
  reducers: {
    setCheckoutItem: (state, action) => {
      state.checkoutItem = action.payload;
      console.log('Checkout Item:', state.checkoutItem);
    }
  }
});

export const checkoutActions = checkoutSlice.actions;
export default checkoutSlice;