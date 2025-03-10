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

const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        removeSession: (state, action) => {
            state.user = null;
        }
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
        user: userSlice.reducer,
        checkout: checkoutSlice.reducer
    }
})

export const cartActions = cartSlice.actions;
export const userActions = userSlice.actions;
export const checkoutActions = checkoutSlice.actions;
export default store;