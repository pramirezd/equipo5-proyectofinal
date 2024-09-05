import React, { useState, useEffect } from "react";
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
import axios from "axios";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from "react-toastify";

const CreateProduct = () => {
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/easycommerce/categories"
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", image);
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("stock", stock);
    formData.append("category_id", category);
    formData.append("brand", brand);
    try {
      const response = await axios.post(
        "http://localhost:5000/easycommerce/products/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 201) {
        toast.success("Product Created")
      } else {
        console.log("Response status:", response.status);
        console.log("Response data:", response.data);
        toast.error("Error Creating Product");
      }
    } catch (error) {
      console.error(
        "Error al crear el producto:",
        error.response?.data || error.message
      );
      toast.error("Error Creating Product");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center mt-16">
      <div className="w-full flex justify-end mr-[430px]">
        <AdminNavBar />
      </div>
      <div className="text-center">
        <h1 className="text-3xl font-semibold">Create a Product</h1>
        <p className="text-md text-gray-500">Add new products to your store</p>
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col shadow-lg p-9 border-t-4 border-blue-500 rounded-lg mt-6"
      >
        <p className="font-semibold text-lg mb-4">Product Information</p>
        <div className="flex flex-col mb-4 p-3">
          {/* Imagen del Producto */}
          <div className="flex flex-col mb-4">
            <label className="font-semibold text-gray-500">Product Image</label>
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
              <label className="font-semibold text-gray-500">Name</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Product Name"
                  className="border rounded-md h-[45px] pr-12 p-2 w-[290px]"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <FaBox className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-400 text-blue-900 p-2 rounded-full text-3xl" />
              </div>
            </div>
            <div className="flex flex-col">
              <label className="font-semibold text-gray-500">Description</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Product Description"
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
              <label className="font-semibold text-gray-500">Price</label>
              <div className="relative">
                <input
                  type="number"
                  placeholder="Product Price"
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
                  placeholder="Product Stock"
                  className="border rounded-md h-[45px] pr-12 p-2 w-[290px]"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                />
                <FaWarehouse className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-400 text-blue-900 p-2 rounded-full text-3xl" />
              </div>
            </div>
          </div>
          {/* Categoría y Marca */}
          <div className="flex gap-12 mt-4">
            <div className="flex flex-col">
              <label className="font-semibold text-gray-500">Category</label>
              <div className="relative">
                <select
                  className="border rounded-md h-[45px] pr-12 p-2 w-[290px]"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
                <FaTag className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-400 text-blue-900 p-2 rounded-full text-3xl" />
              </div>
            </div>
            <div className="flex flex-col">
              <label className="font-semibold text-gray-500">Brand</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Product Brand"
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
            className="w-full border p-2 bg-customBlue text-white rounded-md font-semibold"
          >
            Create
          </button>
        </div>
      </form>
      <ToastContainer/>
    </div>
  );
};

export default CreateProduct;
