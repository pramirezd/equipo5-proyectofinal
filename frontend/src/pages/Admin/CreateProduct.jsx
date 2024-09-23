import React, { useState, useEffect } from "react";
import axios from "axios"; // Para hacer las solicitudes HTTP
import { useAuth } from "../../context/userContext"; // Para obtener el usuario autenticado

// Icons
import {
  FaBox,
  FaDollarSign,
  FaWarehouse,
  FaTag,
  FaTrademark,
  FaImage,
} from "react-icons/fa";
import { HiOutlinePencilAlt } from "react-icons/hi";
import AdminNavBar from "./AdminNavBar";

const CreateProduct = () => {
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [brand, setBrand] = useState("");

  const [categories, setCategories] = useState([]); // Estado para almacenar las categorías
  const [selectedCategoryId, setSelectedCategoryId] = useState(""); // Estado para almacenar el id de la categoría seleccionada

  const { user } = useAuth(); // Obtener el usuario autenticado

  // Función para manejar la carga de la imagen
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  // Función para obtener las categorías desde el endpoint /categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_BACKEND_URL}/easycommerce/categories`
        );
        setCategories(response.data); // Asigna las categorías obtenidas
      } catch (error) {
        console.error("Error al obtener las categorías:", error);
      }
    };
    fetchCategories();
  }, []);

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", image);
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("stock", stock);
    formData.append("category_id", selectedCategoryId); // Enviar el id de la categoría seleccionada
    formData.append("brand", brand);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_BACKEND_URL}/easycommerce/products`, // Ajusta la URL según sea necesario
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true, // Para enviar cookies de autenticación si es necesario
        }
      );
      console.log("Producto creado exitosamente:", response.data);
    } catch (error) {
      console.error("Error al crear el producto:", error);
    }
  };
  // Verificación de que todos los campos estén llenos
  const isFormComplete =
    name &&
    description &&
    price &&
    stock &&
    selectedCategoryId &&
    brand &&
    image;

  return (
    <div className="flex flex-col justify-center items-center mt-16">
      <div className="w-full flex justify-end mr-[220px]">
        <AdminNavBar />
      </div>
      <div className="text-center">
        <h1 className="text-3xl font-semibold">Crear un Producto</h1>
        <p className="text-md text-gray-500">
          Agrega nuevos productos a tu tienda
        </p>
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col shadow-lg p-9 border-t-4 border-blue-500 rounded-lg mt-6"
      >
        <p className="font-semibold text-lg mb-4">Información del Producto</p>
        <div className="flex flex-col mb-4 p-3">
          {/* Imagen del Producto */}
          <div className="flex flex-col mb-4">
            <label className="font-semibold text-gray-500">
              Imagen del Producto
            </label>
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                className="border rounded-md h-[45px] pr-12 p-2 w-[290px]"
                onChange={handleImageChange}
              />
              <FaImage className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-400 text-blue-900 p-2 rounded-full text-3xl" />
            </div>
          </div>
          {/* Nombre y Descripción */}
          <div className="flex gap-12">
            <div className="flex flex-col">
              <label className="font-semibold text-gray-500">Nombre</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Nombre del Producto"
                  className="border rounded-md h-[45px] pr-12 p-2 w-[290px]"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <FaBox className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-400 text-blue-900 p-2 rounded-full text-3xl" />
              </div>
            </div>
            <div className="flex flex-col">
              <label className="font-semibold text-gray-500">Descripción</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Descripción del Producto"
                  className="border rounded-md h-[45px] pr-12 p-2 w-[290px]"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <HiOutlinePencilAlt className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-400 text-blue-900 p-2 rounded-full text-3xl" />
              </div>
            </div>
          </div>
          {/* Precio y Stock */}
          <div className="flex gap-12 mt-4">
            <div className="flex flex-col">
              <label className="font-semibold text-gray-500">Precio</label>
              <div className="relative">
                <input
                  type="number"
                  placeholder="Precio del Producto"
                  className="border rounded-md h-[45px] pr-12 p-2 w-[290px]"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
                <FaDollarSign className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-400 text-blue-900 p-2 rounded-full text-3xl" />
              </div>
            </div>
            <div className="flex flex-col">
              <label className="font-semibold text-gray-500">Stock</label>
              <div className="relative">
                <input
                  type="number"
                  placeholder="Stock del Producto"
                  className="border rounded-md h-[45px] pr-12 p-2 w-[290px]"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                />
                <FaWarehouse className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-400 text-blue-900 p-2 rounded-full text-3xl" />
              </div>
            </div>
          </div>
          {/* Categoría (Dropdown) y Marca */}
          <div className="flex gap-12 mt-4">
            <div className="flex flex-col">
              <label className="font-semibold text-gray-500">Categoría</label>
              <div className="relative">
                <select
                  className="border rounded-md h-[45px] pr-12 p-2 w-[290px]"
                  value={selectedCategoryId}
                  onChange={(e) => setSelectedCategoryId(e.target.value)}
                >
                  <option value="">Selecciona una categoría</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                <FaTag className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-400 text-blue-900 p-2 rounded-full text-3xl" />
              </div>
            </div>
            <div className="flex flex-col">
              <label className="font-semibold text-gray-500">Marca</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Marca del Producto"
                  className="border rounded-md h-[45px] pr-12 p-2 w-[290px]"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                />
                <FaTrademark className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-400 text-blue-900 p-2 rounded-full text-3xl" />
              </div>
            </div>
          </div>
        </div>
        {/* Botón de creación */}
        <div className="flex flex-col justify-center mt-7">
          <button
            type="submit"
            className={`w-full border p-2 text-white rounded-md font-semibold ${
              isFormComplete ? "bg-blue-400" : "bg-gray-400"
            }`}
            disabled={!isFormComplete} // El botón estará deshabilitado si no está completo
          >
            Crear Producto
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProduct;
