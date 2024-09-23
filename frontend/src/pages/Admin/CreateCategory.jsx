import React, { useState } from "react";
import { FaTag } from "react-icons/fa";
import AdminNavBar from "./AdminNavBar";
import axios from "axios"; // Para hacer las solicitudes HTTP
import { useAuth } from "../../context/userContext"; // Para obtener el usuario autenticado

const CreateCategory = () => {
  const [category_name, setCategoryName] = useState("");
  const { user } = useAuth;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_BACKEND_URL}/easycommerce/categories/`, // Ajusta la URL según sea necesario
        { name: category_name },
        { withCredentials: true } // Para enviar cookies de autenticación si es necesario}
      );
      console.log("Categoria creada exitosamente:", response.data);
    } catch (error) {
      console.error("Error al crear categoria:", error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center mt-16">
      <div className="w-full flex justify-end mr-[220px]">
        <AdminNavBar />
      </div>
      <div className="text-center">
        <h1 className="text-3xl font-semibold">Create a Category</h1>
        <p className="text-md text-gray-500">
          Add a new category to your store
        </p>
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col shadow-lg p-9 border-t-4 border-blue-500 rounded-lg mt-6"
      >
        {/* Información de la categoría */}
        <p className="font-semibold text-lg mb-4">Category Information</p>
        <div className="flex flex-col mb-4 p-3">
          {/* Nombre de la Categoría */}
          <div className="flex flex-col">
            <label className="font-semibold text-gray-500">Category Name</label>
            <div className="relative">
              <input
                type="text"
                placeholder="Category Name"
                className="border rounded-md h-[45px] pr-12 p-2 w-[290px]"
                value={category_name}
                onChange={(e) => setCategoryName(e.target.value)}
              />
              <FaTag className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-400 text-blue-900 p-2 rounded-full text-3xl" />
            </div>
          </div>
        </div>
        {/* Botón de creación */}
        <div className="flex flex-col justify-center mt-7">
          <button
            type="submit"
            className="w-full border p-2 bg-blue-400 text-white rounded-md font-semibold"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateCategory;
