import React, { useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { Link } from "react-router-dom";

const ProductCard = ({ producto }) => {
  const [isLiked, setIsLiked] = useState(false);
  const handleLikeClick = () => {
    setIsLiked(!isLiked);
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
        <img src={producto.img} alt={producto.nombre} className="w-32 h-32" />
      </div>
      <div className="flex flex-col gap-4 items-start w-full">
        <div>
          <p>{producto.nombre}</p>
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
            <p className="font-thin">
              Category: {" "}
              <span className="font-semibold">{producto.category}</span>
            </p>
          </div>
        </div>
        <Link to={`/product/${producto.id}`}>
          <button className="font-semibold hover:underline">See Details</button>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
