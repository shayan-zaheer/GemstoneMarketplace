"use client";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Web3Provider from "@/components/Providers";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "@/Store/index.js";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";

const layout = ({ children }) => {
    return (
        <Web3Provider>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <Navbar />
                    <Toaster
                        position="bottom-center"
                        toastOptions={{
                            style: { background: "#d6d4f7", color: "black" },
                        }}
                    />
                    {children}
                    <Footer />
                </PersistGate>
            </Provider>
        </Web3Provider>
    );
};

export default layout;
