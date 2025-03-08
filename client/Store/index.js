import { configureStore } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {cartItems: []},
    reducers: {
        addToCart: (state, action)=>{
            state.cartItems.push(action.payload);
        },
        removeFromCart: (state,action)=>{
            state.cartItems=state.cartItems.filter(items=>action.payload.id!=items.id)
        }
    }
})

const store = configureStore({
    reducer: {
        cart: cartSlice.reducer
    }
})

export const cartActions = cartSlice.actions;
export default store;