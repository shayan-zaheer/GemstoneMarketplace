import Navbar from "@/components/Navbar";
import React, { Children } from "react";

const layout = ({ children }) => {
  return (
    <main>
      <Navbar />
      {children}
    </main>
  );
};

export default layout;
