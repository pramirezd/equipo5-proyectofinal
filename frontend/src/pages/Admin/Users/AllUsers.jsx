import React, { useEffect, useState } from "react";
import AdminNavBar from "../AdminNavBar";
import axios from "axios";
// Icono
import { FaRegTrashCan } from "react-icons/fa6";
// Toast
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Renderizar los usuarios
  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/easycommerce/users",
          { withCredentials: true }
        );
        const data = response.data;
        setUsers(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    getUsers();
  }, []);

  // Manejar el eliminado de usuarios
  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/easycommerce/users/user/${id}`, 
        { withCredentials: true }
      );
      toast.success("Usuario eliminado correctamente");
      setUsers(users);
      {/*  setUsers(users.filter(user => user.id !== id)); */}
    } catch (error) {
      console.error("Error al eliminar al Usuario", error);
      toast.error("Error al eliminar al Usuario");
    }
  };

  if (loading) return <p>Cargando usuarios</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="w-full flex justify-end mr-[430px]">
        <AdminNavBar />
      </div>
      <div className="flex justify-center items-center gap-5">
        <h1 className="text-2xl font-semibold text-center">Users List</h1>
        <p className="text-lg font-medium bg-blue-400 p-2 rounded-full w-[30px] h-[30px] flex items-center justify-center text-white">
          {users.length}
        </p>
      </div>

      <div className="w-full max-w-4xl mt-11">
        <table className="table-auto w-full border-collapse">
          <thead>
            <tr>
              <th className="p-4 font-semibold">Name</th>
              <th className="p-4 font-semibold">Last Name</th>
              <th className="p-4 font-semibold">Address</th>
              <th className="p-4 font-semibold">Phone</th>
              <th className="p-4 font-semibold">Email</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="text-center">
                <td className="p-4 rounded hover:bg-gray-100">{user.name}</td>
                <td className="p-4 rounded hover:bg-gray-100">{user.lastname}</td>
                <td className="p-4 rounded hover:bg-gray-100">{user.address}</td>
                <td className="p-4 rounded hover:bg-gray-100">{user.phone}</td>
                <td className="p-4 rounded hover:bg-gray-100">{user.email}</td>
                <td className="p-4 text-center">
                  <button onClick={() => handleDelete(user.id)}>
                    <FaRegTrashCan className="text-red-600" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AllUsers;
