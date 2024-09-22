import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/userContext";
import AdminNavBar from "./AdminNavBar";
import axios from "axios"; // Para hacer las solicitudes HTTP

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const { user } = useAuth();
  useEffect(() => {
    const fetchUsers = async () => {
      if (user && user.id) {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_APP_BACKEND_URL}/easycommerce/users/`,
            { withCredentials: true }
          );
          setUsers(response.data); // Guardar los usuarios en el estado
        } catch (err) {
          console.log(err);
        }
      }
    };
    fetchUsers();
  }, [user]);

  // Función para eliminar un usuario
  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(
        `${
          import.meta.env.VITE_APP_BACKEND_URL
        }/easycommerce/users/user/${userId}`,
        { withCredentials: true }
      );
      // Actualizar el estado de los usuarios eliminando el usuario borrado
      setUsers(users.filter((user) => user.id !== userId));
      console.log("Usuario eliminado exitosamente");
    } catch (err) {
      console.error("Error al eliminar el usuario:", err);
    }
  };

  return (
    <div className="flex flex-col items-center">
      {/* Admin NavBar */}
      <div className="w-full flex justify-end mb-4">
        <AdminNavBar />
      </div>

      {/* Users Table */}
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-semibold mb-4">Lista de Usuarios</h1>
        <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-black">
            <thead className="text-xs uppercase bg-white text-black">
              <tr>
                <th scope="col" className="px-6 py-3">
                  ID
                </th>
                <th scope="col" className="px-6 py-3">
                  NOMBRE
                </th>
                <th scope="col" className="px-6 py-3">
                  APELLIDO
                </th>
                <th scope="col" className="px-6 py-3">
                  DIRECCIÓN
                </th>
                <th scope="col" className="px-6 py-3">
                  TELÉFONO
                </th>
                <th scope="col" className="px-6 py-3">
                  EMAIL
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  ACCIÓN
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr
                  key={u.id}
                  className="bg-white border-b border-[#374151] hover:bg-white"
                >
                  <td className="px-6 py-4 text-black-200">{u.id}</td>
                  <td className="px-6 py-4 text-black-200">{u.name}</td>
                  <td className="px-6 py-4 text-black-200">{u.lastname}</td>
                  <td className="px-6 py-4 text-black-200">{u.address}</td>
                  <td className="px-6 py-4 text-black-200">{u.phone}</td>
                  <td className="px-6 py-4 text-black-200">{u.email}</td>
                  <td className="px-6 py-4 text-right flex gap-2 justify-end">
                    <button
                      className={`font-bold py-2 px-4 rounded ${
                        u.isadmin
                          ? "bg-gray-300 text-gray-600 cursor-not-allowed" // Botón gris cuando está deshabilitado
                          : "bg-[#EF4444] hover:bg-gray text-white" // Estilo normal
                      }`}
                      onClick={() => !u.isadmin && handleDeleteUser(u.id)} // Ejecuta solo si no es admin
                      disabled={u.isadmin} // Deshabilitar el botón si es admin
                    >
                      Eliminar
                    </button>
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

export default AllUsers;
