"use client";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Web3Provider from "@/components/Providers";
import React from "react";
import store from "@/Store/index.js";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";

const layout = ({ children }) => {
  return (
    <Web3Provider>
      <Provider store={store}>
        <Navbar />
        <Toaster position="bottom-center" />
        {children}
        <Footer />
      </Provider>
    </Web3Provider>
  );
};

export default layout;
