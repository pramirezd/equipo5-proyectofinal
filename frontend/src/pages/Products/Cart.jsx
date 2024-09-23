import React from "react";
import axios from "axios";
import { useCart } from "../../context/cartContext";
import { useAuth } from "../../context/userContext";
import { useNavigate } from "react-router-dom"; // Importar useNavigate
import CartProductCard from "./CartProductCard";

const Cart = () => {
  const { cart, setCart } = useCart();
  const { user } = useAuth(); // Obtener el usuario autenticado
  const navigate = useNavigate(); // Inicializar useNavigate

  const totalPriceInCart = cart.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );

  // Función para manejar el checkout
  const handleCheckout = async () => {
    if (cart.length === 0) {
      alert("No hay productos en el carrito");
      return;
    }

    // Estructurar los datos para enviar al backend
    const orderData = {
      total: totalPriceInCart, // Total del carrito
      order_state: "pending", // Estado inicial de la orden, puedes ajustarlo según tu lógica
      products: cart.map((product) => ({
        product_id: product.product_id, // Asegúrate de tener el ID del producto en tu carrito
        quantity: product.quantity, // Cantidad de cada producto
      })),
    };

    try {
      // Enviar la orden al backend
      const response = await axios.post(
        `${import.meta.env.VITE_APP_BACKEND_URL}/easycommerce/orders/user/${
          user.id
        }`,
        orderData,
        {
          withCredentials: true, // Para enviar cookies de autenticación si es necesario
        }
      );

      // Mostrar mensaje de éxito y redirigir a "Mis Órdenes"
      console.log("Orden creada:", response.data);
      alert("Orden creada correctamente");

      for (const product of cart) {
        await axios.delete(
          `${import.meta.env.VITE_APP_BACKEND_URL}/easycommerce/cart/user/${
            user.id
          }/product/${product.product_id}`,
          { withCredentials: true }
        );
      }

      // Vaciar el carrito en el frontend
      setCart([]);

      // Redirigir a la página de "Mis Órdenes"
      navigate("/myOrders");
    } catch (error) {
      console.error("Error al crear la orden o vaciar el carrito:", error);
      alert("Hubo un error al crear la orden o vaciar el carrito");
    }
  };

  return (
    <>
      <section className="py-24 relative">
        <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto">
          <h2 className="title font-manrope font-bold text-4xl leading-10 mb-8 text-center text-black">
            Shopping Cart
          </h2>

          {cart.map((producto) => (
            <CartProductCard key={producto.id} producto={producto} />
          ))}

          <div className="flex flex-col md:flex-row items-center md:items-center justify-between lg:px-6 pb-6 border-b border-gray-200 max-lg:max-w-lg max-lg:mx-auto">
            <h5 className="text-gray-900 font-manrope font-semibold text-2xl leading-9 w-full max-md:text-center max-md:mb-4">
              Subtotal
            </h5>
            <div className="flex items-center justify-between gap-5 ">
              <button className="rounded-full py-2.5 px-3 bg-indigo-50 text-indigo-600 font-semibold text-xs text-center whitespace-nowrap transition-all duration-500 hover:bg-indigo-100">
                Promo Code?
              </button>
              <h6 className="font-manrope font-bold text-3xl lead-10 text-indigo-600">
                ${totalPriceInCart}
              </h6>
            </div>
          </div>
          <div className="max-lg:max-w-lg max-lg:mx-auto">
            <p className="font-normal text-base leading-7 text-gray-500 text-center mb-5 mt-6">
              Shipping taxes, and discounts calculated at checkout
            </p>
            <button
              onClick={handleCheckout} // Llamar a la función cuando se presiona Checkout
              className="rounded-full py-4 px-6 bg-indigo-600 text-white font-semibold text-lg w-full text-center transition-all duration-500 hover:bg-indigo-700 "
            >
              Checkout
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Cart;
