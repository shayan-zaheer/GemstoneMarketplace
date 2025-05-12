import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import cartSlice from "./cartSlice";
import userSlice from "./userSlice";
import checkoutSlice from "./checkoutSlice";
import socketSlice from "./socketSlice.js";

const createNoopStorage = () => {
    return {
        getItem(_key) {
            return Promise.resolve(null);
        },
        setItem(_key, value) {
            return Promise.resolve(value);
        },
        removeItem(_key) {
            return Promise.resolve();
        },
    };
};

const storage =
    typeof window !== "undefined"
        ? createWebStorage("local")
        : createNoopStorage();

const rootReducer = combineReducers({
    cart: cartSlice.reducer,
    user: userSlice.reducer,
    checkout: checkoutSlice.reducer,
    socket: socketSlice.reducer,
}, );

const persistConfig = {
    key: "root",
    storage,
    version: 1,
    whitelist: ['user', 'cart', 'socket'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredPaths: ['socket.socket', 'meta.arg', 'payload.socket'],
                ignoredActions: ["persist/PERSIST"],
            },
        }),
});

const persistor = persistStore(store);

export { store, persistor };