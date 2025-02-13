import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Web3Provider from "@/components/Providers";
import React from "react";

const layout = ({ children }) => {
  return (
    <Web3Provider>
      <Navbar />
      {children}
      <Footer />
    </Web3Provider>
  );
};

export default layout;
