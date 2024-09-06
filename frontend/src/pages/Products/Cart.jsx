import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/userContext";
import { FaRegTrashCan } from "react-icons/fa6";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Cart = () => {
  const { cart, getCart, removeFromCart } = useAuth();
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      const fetchedCart = await getCart();
      console.log("Fetched Cart:", fetchedCart);
      if (fetchedCart && fetchedCart.products) {
        setCartItems(fetchedCart.products);
      }
    };

    fetchCart();
  }, [getCart]);

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  };

  const handleRemove = (cartProductId) => {
    try {
      removeFromCart(cartProductId);
      toast.success("Producto Eliminado del carrito");
    } catch (error) {
      toast.error("Error al eliminar el producto");
    }
  };

  const handleCreateOrder = async () => {
    try {
      const total = calculateTotal();
      const response = await axios.post(
        "http://localhost:5000/easycommerce/orders/",
        { total, order_state: "pendiente" },
        { withCredentials: true }
      );
      toast.success("Orden creada correctamente");
    } catch (error) {
      toast.error("Error al crear la orden");
    }
  };

  const total = calculateTotal();

  if (cartItems.length === 0) {
    return (
      <div className="flex justify-center mt-16">
        <p className="text-xl font-semibold">Cart Is Empty</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center mt-16">
      <p className="text-2xl font-semibold mb-4">My Cart</p>
      <div className="flex flex-col gap-4">
        {cartItems.map((item) => (
          <div key={item.id} className="p-4 rounded-lg shadow-md">
            <div className="flex items-center gap-4">
              <img
                src={`http://localhost:5000/${item.img_url}`}
                alt={item.name}
                className="w-32 h-32"
              />
              <div>
                <p className="text-xl font-semibold">{item.name}</p>
                <p className="text-lg font-bold">${item.price}</p>
                <p className="text-md text-gray-500">
                  Quantity: {item.quantity}
                </p>
                <button
                  onClick={() => handleRemove(item.id)}
                  className="mt-2 text-red-500 flex gap-2"
                >
                  <FaRegTrashCan className="text-xl" />
                  <p className="font-semibold">Delete</p>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 bg-blue-600 rounded-lg p-4">
        <p className="text-2xl font-semibold text-white">
          Total: ${total.toFixed(2)}
        </p>
      </div>
      <button
        onClick={handleCreateOrder}
        className="mt-2 text-blue-500 p-2 rounded-lg hover:underline"
      >
        Create Order
      </button>
      <ToastContainer />
    </div>
  );
};

export default Cart;
