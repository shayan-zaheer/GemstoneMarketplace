import { configureStore } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: { cartItems: [] },
    reducers: {
        addToCart: (state, action) => {
            state.cartItems.push(action.payload);
        },
        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter(items => action.payload.id != items.id)
        },
    }
})

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
})

const store = configureStore({
    reducer: {
        cart: cartSlice.reducer,
        checkout: checkoutSlice.reducer
    }
})

export const cartActions = cartSlice.actions;
export const checkoutActions = checkoutSlice.actions;
export default store;