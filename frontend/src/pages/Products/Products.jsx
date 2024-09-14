// src/components/Products.js
import React from "react";
import ProductCard from "./ProductCard";
import { useEffect, useState } from "react";

// import productos from "../../data.js";

const urlApi = `${import.meta.env.VITE_APP_BACKEND_URL}/easycommerce/products/`;

const Products = ({ limite }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getData();
  }, [products]);

  const getData = async () => {
    const response = await fetch(urlApi);
    const data = await response.json();

    setProducts(data);
  };

  const productosAMostrar = limite ? products.slice(0, limite) : products;
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
