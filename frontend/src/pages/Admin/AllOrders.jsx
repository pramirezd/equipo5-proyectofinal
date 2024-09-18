import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/userContext";
import AdminNavBar from "./AdminNavBar";
import axios from "axios"; // Para hacer las solicitudes HTTP

const API_URL = 'http://localhost:3000';

const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useAuth();
  useEffect(() => {
    const fetchOrders = async () => {
      if (user && user.id) {
        try {
          const response = await axios.get(
            `${API_URL}/easycommerce/orders/allOrders`,
            { withCredentials: true }
          );
          setOrders(response.data); // Guardar los usuarios en el estado
        } catch (err) {
          console.log(err);
        }
      }
    };
    fetchOrders();
  }, [user]);

  return (
    <div className="flex flex-col items-center">
      {/* Admin NavBar */}
      <div className="w-full flex justify-end mb-4">
        <AdminNavBar />
      </div>

      {/* Users Table */}
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-semibold mb-4">Lista de Ordenes</h1>
        <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-black">
            <thead className="text-xs uppercase bg-white text-black">
              <tr>
                <th scope="col" className="px-6 py-3">
                  ORDER ID
                </th>
                <th scope="col" className="px-6 py-3">
                  NOMBRE
                </th>
                <th scope="col" className="px-6 py-3">
                  APELLIDO
                </th>
                <th scope="col" className="px-6 py-3">
                  EMAIL
                </th>
                <th scope="col" className="px-6 py-3">
                  TOTAL
                </th>
                <th scope="col" className="px-6 py-3">
                  ESTADO
                </th>
                <th scope="col" className="px-6 py-3">
                  FECHA DE CREACION
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr
                  key={order.id}
                  className="bg-white border-b border-[#374151] hover:bg-white"
                >
                  <td className="px-6 py-4 text-black-200">{order.order_id}</td>
                  <td className="px-6 py-4 text-black-200">{order.name}</td>
                  <td className="px-6 py-4 text-black-200">{order.lastname}</td>
                  <td className="px-6 py-4 text-black-200">{order.email}</td>
                  <td className="px-6 py-4 text-black-200">{order.total}</td>
                  <td className="px-6 py-4 text-black-200">
                    {order.order_state}
                  </td>
                  <td className="px-6 py-4 text-black-200">
                    {order.created_at}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllOrders;
