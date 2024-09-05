import React, { useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { FaRegTrashCan } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";
import axios from "axios";
import { useAuth } from "../../context/userContext";

import { toast } from "react-toastify";

const ProductCard = ({ producto }) => {
  const [isLiked, setIsLiked] = useState(false);
  const navigate = useNavigate();
  const { autenticado, isAdmin, addFavorite } = useAuth();

  const handleLikeClick = async () => {
    try {
      if (isLiked) {
        await removeFavorite(producto.id);
        setIsLiked(false);
        toast.success("Producto eliminado de favoritos");
      } else {
        await addFavorite(producto.id);
        setIsLiked(true);
        toast.success("Producto agregado a favoritos");
      }
    } catch (error) {
      toast.error("Error al actualizar favoritos");
    }
  };

  const handleDelete = async () => {
    try {
      const eliminar = await axios.delete(
        `http://localhost:5000/easycommerce/products/product/${producto.id}`
      );
      toast.success("Producto eliminado correctamente");
    } catch (error) {
      console.error("Error al eliminar el producto", error);
      toast.error("Error al eliminar el producto");
    }
  };
  const handleDetails = () => {
    navigate(`/product/${producto.id}`);
  };

  return (
    <div className="relative m-4 p-4 rounded-lg shadow-md w-[250px] flex flex-col items-start transform transition-all duration-500 hover:-translate-y-2">
      <div className="absolute top-2 right-2">
        {isLiked ? (
          <AiFillHeart
            className="text-red-500 cursor-pointer text-2xl transition-colors duration-300"
            onClick={handleLikeClick}
          />
        ) : (
          <AiOutlineHeart
            className="text-red-400 hover:text-red-500 cursor-pointer text-2xl transition-colors duration-300"
            onClick={handleLikeClick}
          />
        )}
      </div>

      <div className="flex justify-center w-full">
        <img
          src={`http://localhost:5000/${producto.img_url}`}
          alt={producto.name}
          className="w-32 h-32"
        />
      </div>
      <div className="flex flex-col gap-4 items-start w-full">
        <div>
          <p>{producto.name}</p>
          <p className="font-thin">
            <span className="font-bold">
              {"\u00A9"}
              {producto.brand}
            </span>
          </p>
          <div>
            <p className="text-2xl text-green-600 font-bold">
              ${producto.price}
            </p>
            <p className="text-lg font-thin">
              Category:{" "}
              <span className="font-semibold">{producto.category_name}</span>
            </p>
          </div>
        </div>
        <div className="flex justify-between w-full">
          <button
            onClick={handleDetails}
            className="font-semibold hover:underline"
          >
            See Details
          </button>
          {/* Si el usuario es admin se pueden eliminar los productos y actualizarlos */}
          {isAdmin && (
            <div className="flex justify-center items-center gap-5">
              <button onClick={handleDelete}>
                <FaRegTrashCan className="text-red-600 text-xl" />
              </button>
              <button>
                <FaRegEdit className="text-green-500 text-xl" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
