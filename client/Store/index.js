import { configureStore } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { combineReducers } from "redux";

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

const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        removeSession: (state) => {
            state.user = null;
        }
    }
});

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

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["user", "cart"]
};

const rootReducer = combineReducers({
    cart: persistReducer(persistConfig, cartSlice.reducer),
    user: persistReducer(persistConfig, userSlice.reducer),
    checkout: checkoutSlice.reducer
});

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

const persistor = persistStore(store);

export const cartActions = cartSlice.actions;
export const userActions = userSlice.actions;
export const checkoutActions = checkoutSlice.actions;

export { store, persistor };