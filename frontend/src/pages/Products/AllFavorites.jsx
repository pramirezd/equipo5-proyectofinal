import React from "react";
import Products from "./Products";

const AllFavorites = () => {
  return (
    <div className="flex flex-col items-center gap-11 mt-16">
      <h1 className="text-2xl font-semibold">All Favorites</h1>
      {/* Agregara Barra para filtrar los productos */}
      <Products limite={10} justFavorites={true} />
    </div>
  );
};

export default AllFavorites;
