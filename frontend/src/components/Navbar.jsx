import logoImage from "../img/Logo_Prueba-removebg-preview.png";
import { useCart } from "../context/cartContext"; // Importa el contexto del carrito
import { useAuth } from "../context/userContext"; // Importa el contexto de autenticación

// Iconos
import { FaRegUserCircle } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa6";
import { MdOutlineShoppingCart, MdLogout } from "react-icons/md"; // Icono de logout
import { FaBox } from "react-icons/fa"; // Icono de órdenes
import { useFavorite } from "../context/favoriteContext";

// Utilidades
import { Link } from "react-router-dom";

const Navbar = () => {
  const { cart } = useCart();
  const { user, logout } = useAuth(); // Obtener el usuario y la función de logout del contexto de autenticación
  const { favorites } = useFavorite();
  const totalItemsInCart = cart.reduce(
    (total, product) => total + product.quantity,
    0
  );

  return (
    <div>
      {/* Saludo al usuario */}
      {user && (
        <div className="text-center p-2 bg-gray-100">
          <span className="text-lg font-semibold">Hola, {user.name}!</span>
        </div>
      )}

      {/* Barra de navegacion */}
      <div className="flex justify-around items-center p-10 cursor-pointer">
        {/* Contenedor para el logo */}
        <div>
          <img src={logoImage} alt="Logo" className="w-[30px]" />
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

          {!user && (
            <>
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
            </>
          )}
        </div>

        {/* Contenedor para Iconos PERFIL - FAVORITOS - CARRITO - ÓRDENES */}
        <div className="flex gap-7 text-xl">
          {user && (
            <>
              <Link to="/profile">
                <FaRegUserCircle />
              </Link>
              <Link to="/favorites">
                <FaRegHeart />
              </Link>

              {/* Ícono del Carrito de Compras */}
              <Link to="/cart" className="relative">
                <MdOutlineShoppingCart />
                {/* Si hay productos en el carrito, muestra el contador */}
                {totalItemsInCart > 0 && (
                  <span className="absolute top-[-10px] right-[-10px] bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                    {totalItemsInCart}
                  </span>
                )}
              </Link>

              {/* Ícono de Mis Órdenes */}
              <Link to="/myOrders" className="relative">
                <FaBox />
              </Link>
              {/* Icono de Logout */}
              <MdLogout
                onClick={logout}
                className="cursor-pointer text-red-600 hover:text-red-800 transition-colors duration-200"
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
