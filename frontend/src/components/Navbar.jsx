import React from "react";
import logoImage from "../img/Logo_Prueba-removebg-preview.png";

//Iconos
import { FaRegUserCircle } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa6";
import { MdOutlineShoppingCart } from "react-icons/md";

//Utilidades
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    // Barra de navegacion
    <div className="flex justify-around items-center p-10 cursor-pointer">
      {/* Contenedor para el logo */}
      <div>
        <img src={logoImage} alt="" className="w-[30px]" />
      </div>
      {/* Contenedor para los botones de HOME - LOGIN - REGISTER */}
      <div className="flex gap-16 text-md">
        <Link to="/" className="p-2">
          Home
        </Link>
        <Link to="/products" className="p-2">
          Products
        </Link>
        <Link to="/aboutUs" className="p-2">
          About Us
        </Link>
        <Link
          to="/login"
          className="text-blue-600 font-semibold p-2 hover:text-blue-900 transition-colors duration-200 ease-in-out"
        >
          Sign In
        </Link>
        <Link
          to="/register"
          className="bg-blue-600 text-white font-semibold rounded-2xl p-2 hover:bg-blue-500 transition-colors duration-200 ease-in-out"
        >
          Sign Up
        </Link>
      </div>
      {/* Contenedor para Iconos  PERFIL - FAVORITOS - CARRITO */}
      <div className="flex gap-7 text-xl">
        <Link to="/profile">
          <FaRegUserCircle />
        </Link>
        <Link to="/favorites">
          <FaRegHeart />
        </Link>
        <Link to="/cart">
          <MdOutlineShoppingCart />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
