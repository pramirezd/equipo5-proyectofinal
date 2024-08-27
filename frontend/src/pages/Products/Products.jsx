// src/components/Products.js
import React from "react";
import ProductCard from "./ProductCard";
import productos from "../../data.js";

const Products = ({ limite }) => {
  const productosAMostrar = limite ? productos.slice(0, limite) : productos;
  return (
    <div>
      <div className="flex flex-wrap justify-center">
        {productosAMostrar.map((producto) => (
          <ProductCard key={producto.id} producto={producto} />
        ))}
      </div>
    </div>
  );
};

export default Products;
