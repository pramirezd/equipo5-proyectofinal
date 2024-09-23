import React from "react";
import ProductCard from "./ProductCard";
import { useEffect, useState } from "react";
import { useFavorite } from "../../context/favoriteContext";

// URL de la API
const urlApi = `${import.meta.env.VITE_APP_BACKEND_URL}/easycommerce/products/`;

const Products = ({ limite, justFavorites = false }) => {
  const [products, setProducts] = useState([]);
  const { favorites } = useFavorite();
  const favoritesIds = favorites.map((p) => p.product_id);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response = await fetch(urlApi);
    const data = await response.json();
    setProducts(data);
  };

  // Filtrar productos si justFavorites es true, de lo contrario mostrar todos los productos
  const productosAMostrar = justFavorites
    ? products.filter(
        (producto) => favoritesIds.includes(producto.id.toString()) // Comparar los IDs de favoritos con los productos
      )
    : products;

  const productosFinales = limite
    ? productosAMostrar.slice(0, limite)
    : productosAMostrar;

  return (
    <div>
      <div className="flex flex-wrap justify-center">
        {productosFinales.map((producto) => (
          <ProductCard key={producto.id} producto={producto} />
        ))}
      </div>
    </div>
  );
};

export const getProducts = async () => {
  const response = await fetch(urlApi);
  const data = await response.json();
  return data;
};

export default Products;
