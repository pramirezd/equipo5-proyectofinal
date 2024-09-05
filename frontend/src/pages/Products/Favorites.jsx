import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/userContext";
import { useProducts } from "../../context/productContext";
import { FaRegTrashCan } from "react-icons/fa6";
import { FiShoppingCart } from "react-icons/fi";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

const Favorites = () => {
  const { favorites, fetchFavorites, removeFavorite } = useAuth();
  const { products, fetchProducts } = useProducts();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useAuth();

  useEffect(() => {
    const loadData = async () => {
      try {
        await fetchFavorites();
        await fetchProducts();
      } catch (err) {
        setError("Error al cargar datos");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [fetchFavorites, fetchProducts]);

  const handleRemove = async (productId) => {
    try {
      await removeFavorite(productId);
      await fetchFavorites();
      toast.success("Producto eliminado de favoritos");
    } catch (err) {
      toast.error("Hubo un error al eliminar el producto de favoritos");
      setError("Error al eliminar el producto de favoritos");
    }
  };

  const addProductToCart = async (productId) => {
    try {
      await addToCart(productId, 1);
      toast.success("Producto agregado al carrito");
    } catch (error) {
      toast.error("Error al agregar el producto al carrito");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const favoriteProducts = products.filter((product) =>
    favorites.some((fav) => fav.product_id === product.id)
  );
  return (
    <div className="flex flex-col items-center gap-11 mt-16">
      <h1 className="text-2xl font-semibold">My Favorites</h1>
      <div className="flex gap-11 flex-wrap">
        {favoriteProducts.length > 0 ? (
          favoriteProducts.map((product) => (
            <div
              key={product.id}
              className="p-4 rounded-lg shadow-lg w-[270px] flex"
            >
              <div className="flex flex-col items-center gap-7">
                <span className=" bg-blue-300 rounded-lg px-2 py-1 text-blue-500 font-medium text-sm mr-44">
                  {product.brand}
                </span>
                <img
                  src={`http://localhost:5000/${product.img_url}`}
                  alt={product.name}
                  className="w-36 h-36"
                />
                <div>
                  <p className="text-xl font-semibold">{product.name}</p>
                  <div className="mt-2 flex flex-col">
                    <p className="text-gray-500">Shipped in 3-4 Days</p>
                    <p className="text-lg font-bold">${product.price}</p>
                  </div>
                  <div className="flex justify-center items-center mt-2 gap-4">
                    <button
                      className="flex gap-1 items-center bg-gray-200 p-2 rounded-xl"
                      onClick={() => addProductToCart(product.id)}
                    >
                      <FiShoppingCart />
                      <p className="font-semibold">Add to cart</p>
                    </button>
                    <button
                      onClick={() => handleRemove(product.id)}
                      className="text-white flex gap-1 bg-red-500 p-2 rounded-xl"
                    >
                      <FaRegTrashCan className="text-xl" />
                      <p className="font-semibold">Delete</p>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No tienes productos en tus favoritos.</p>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Favorites;
