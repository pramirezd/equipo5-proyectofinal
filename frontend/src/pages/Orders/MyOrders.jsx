import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/userContext"; // Para obtener el usuario autenticado



const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useAuth(); // Obtener el usuario autenticado

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_BACKEND_URL}/easycommerce/orders/user/${
            user.id
          }`,
          { withCredentials: true } // Enviar cookies de autenticación
        );
        setOrders(response.data.orders);
      } catch (error) {
        console.error("Error al obtener las órdenes:", error);
      }
    };

    if (user && user.id) {
      fetchOrders();
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center mt-8">
      <h1 className="text-3xl font-bold mb-6">Mis Órdenes</h1>
      {orders.length === 0 ? (
        <p className="text-lg text-gray-500">No tienes órdenes aún.</p>
      ) : (
        <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto">
          {orders.map((order) => (
            <div
              key={order.id}
              className="rounded-3xl border-2 border-gray-200 p-4 lg:p-8 grid grid-cols-12 mb-8 max-lg:max-w-lg max-lg:mx-auto gap-y-4"
            >
              <div className="col-span-12 lg:col-span-10 detail w-full lg:pl-3">
                <div className="flex items-center justify-between w-full mb-4">
                  <h5 className="font-manrope font-bold text-2xl leading-9 text-gray-900">
                    Orden ID: {order.id}
                  </h5>
                  <p className="font-semibold text-xl text-green-600">
                    Total: ${order.total}
                  </p>
                </div>
                <p className="text-md text-gray-500 mb-4">
                  Estado: {order.order_state}
                </p>
                <p className="text-sm text-gray-400 mb-4">
                  Creada el: {new Date(order.created_at).toLocaleDateString()}
                </p>
                <h3 className="text-lg font-semibold mb-2">Productos:</h3>
                <ul className="mb-4">
                  {order.order_detail.map((product, index) => (
                    <li key={index} className="text-md text-gray-700">
                      {product.product_name} - {product.quantity} unidades
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
