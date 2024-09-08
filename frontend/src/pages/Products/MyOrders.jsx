import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/userContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/easycommerce/orders/`,
          { withCredentials: true }
        );
        console.log(response.data);
        setOrders(response.data.orders);
      } catch (error) {
        toast.error("Error al obtener las órdenes");
      }
    };

    if (user) {
      fetchOrders();
    }
  }, [user]);
  const handleDelete = async (orderId) => {
    try {
      await axios.delete(
        `http://localhost:5000/easycommerce/orders/order/${orderId}`,
        { withCredentials: true }
      );
      setOrders(orders.filter((order) => order.id !== orderId));
      toast.success("Orden eliminada con éxito");
    } catch (error) {
      toast.error("Error al eliminar la orden");
    }
  };

  return (
    <div className="flex flex-col items-center mt-16">
      {orders.length === 0 ? (
        <p className="text-xl font-semibold">No Orders Found</p>
      ) : (
        <div className="flex flex-col gap-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="p-4 rounded-lg shadow-md flex justify-center items-center gap-11"
            >
              <p className="text-xl">
                Order ID: <span className="font-semibold">{order.id}</span>
              </p>
              <p className="text-lg">
                Total: ${" "}
                <span className="text-green-500 font-semibold">
                  {order.total}
                </span>{" "}
              </p>
              <p className="text-md">
                Status:{" "}
                <span className="text-red-600 font-semibold">
                  {order.order_state}
                </span>
              </p>
              <button
                onClick={() => handleDelete(order.id)}
                className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default MyOrders;
