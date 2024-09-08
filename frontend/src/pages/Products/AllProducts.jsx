import React from "react";
import Products from "./Products";

const AllProducts = () => {
  return (
    <div className="flex flex-col items-center gap-11 mt-16">
      <h1 className="text-2xl font-semibold">All Products</h1>
      {/* Agregara Barra para filtrar los productos */}
      <div className="">
      </div>
      <Products />
    </div>
  );
};

export default AllProducts;