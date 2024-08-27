// src/components/ProductDetails.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import productos from "../../data.js";

const ProductDetail = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simula la obtención del producto de prueba
    const fetchProduct = () => {
      const productoEncontrado = productos.find(
        (prod) => prod.id === parseInt(id)
      );
      if (productoEncontrado) {
        setProducto(productoEncontrado);
        setError(null);
      } else {
        setError("Producto no encontrado");
      }
      setLoading(false);
    };

    fetchProduct();
  }, [id]);

  if (loading) return <p>Cargando producto...</p>;
  if (error) return <p>{error}</p>;
  if (!producto) return <p>Producto no encontrado</p>;

  return (
    <div className="flex flex-col items-center mt-32">
      <div className="flex gap-20 p-11">
        <div>
          <img src={producto.img} alt={producto.nombre} className="w-64 h-64" />
        </div>
        <div className="flex flex-col justify-center gap-4">
          <h1 className="text-2xl font-bold">{producto.nombre}</h1>
          <div>
            <p>{producto.seller}</p>
            <p className="text-xl font-semibold text-green-600">
              ${producto.price}
            </p>
          </div>
          <div className="flex items-center justify-center w-full">
            <button className="w-full p-2 bg-blue-500 rounded-lg text-white font-semibold">
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
