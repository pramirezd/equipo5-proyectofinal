import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminNavBar from './AdminNavBar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AllOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          'http://localhost:5000/easycommerce/orders/allOrders',
          { withCredentials: true }
        );
        console.log('Orders Response:', response.data);
        setOrders(response.data.orders || []);
      } catch (error) {
        toast.error('Error al obtener las órdenes');
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center mt-16">
      <div className="w-full flex justify-end mb-4 mr-[430px]">
        <AdminNavBar />
      </div>
      <h1 className="text-2xl font-semibold mb-4">Orders</h1>
      {orders.length === 0 ? (
        <p className="text-xl font-semibold">No Orders Found</p>
      ) : (
        <div className="flex flex-col gap-4">
          {orders.map((order) => (
            <div key={order.id} className="p-4 rounded-lg shadow-md flex justify-center items-center gap-11">
              <p className="text-xl">User: <span className="font-semibold">{order.user_name}</span></p>
              <p className="text-lg">Total: $ <span className="text-green-500 font-semibold">{order.total}</span> </p>
              <p className="text-md">
                Status: <span className="text-red-600 font-semibold">
                {order.order_state}
                </span>
              </p>
            </div>
          ))}
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default AllOrders;
