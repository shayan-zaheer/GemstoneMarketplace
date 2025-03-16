import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { combineReducers } from "redux";
import cartSlice from "./cartSlice";
import userSlice from "./userSlice";
import checkoutSlice from "./checkoutSlice";



const rootReducer = combineReducers({
    cart: cartSlice.reducer,
    user: userSlice.reducer,
    checkout: checkoutSlice.reducer
})


const persistConfig = {
    key: "root",
    storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }),
});

const persistor = persistStore(store);

export { store, persistor };