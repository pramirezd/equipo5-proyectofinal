import React from "react";

const CarouselProductCard = ({ name, description, price, image, seller, onAddToCart }) => {
  return (
    <div className="flex flex-col justify-center items-center mt-7">
      <div className="flex gap-3 rounded-lg p-7 shadow-lg">
        <div className="flex flex-col gap-3 rounded-lg p-4 shadow-xl">
          <p className="text-xl text-blue-500 font-semibold">Best Sellers</p>
          <div className="flex flex-col flex-grow w-[270px] p-2">
            <p className="text-lg font-semibold">{name}</p>
            <p className="text-md font-light">{description}</p>
          </div>
          <div className="p-2">
            <p className="font-light">Seller</p>
            <p className="font-bold">
              {"\u00A9"} {seller}
            </p>
          </div>
          <div className="flex items-center flex-grow p-2 gap-2">
            <p className="font-bold text-2xl text-green-600">${price}</p>
            <p className="font-thin">Credit or Debit</p>
          </div>
          <button
            className="rounded-lg p-2 bg-blue-500 text-white"
            onClick={onAddToCart}
          >
            Add To Cart
          </button>
        </div>
        <div className="">
          <img
            className="object-cover object-center w-full rounded-lg h-96 p-4"
            src={`http://localhost:5000/${image}`}
            alt={name}
          />
        </div>
      </div>
    </div>
  );
};

export default CarouselProductCard;
