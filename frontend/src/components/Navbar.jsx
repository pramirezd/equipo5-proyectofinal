import React from "react";
//Contexto
import { useAuth } from "../context/userContext";
//Iconos
import { FaRegUserCircle } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa6";
import { MdOutlineShoppingCart } from "react-icons/md";

//Utilidades
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  {
    /* Llamar a mis funciones y estados desde mi contexto */
  }
  const { user, autenticado, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };
  return (
    // Barra de navegacion
    <div className="flex justify-center gap-24 items-center p-10 cursor-pointer">
      {/* Contenedor para el logo */}
      <div>
        LOGO
      </div>
      {/* Contenedor para los botones de HOME - LOGIN - REGISTER */}
      {autenticado ? (
        <>
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
            <button onClick={handleLogout} className="bg-blue-600 text-white font-semibold rounded-2xl p-2 hover:bg-blue-500 transition-colors duration-200 ease-in-out" >
              Logout
            </button>
          </div>
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
        </>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
};

export default Navbar;
