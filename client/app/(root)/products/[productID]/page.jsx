import IndividualProduct from "@/components/IndividualProduct";

import React from "react";



const Product = async({params}) => {
  const {productID} = await params;
  

  return (
    <IndividualProduct productID={productID} />
  );
};

export default Product;
