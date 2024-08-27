import React, { useState } from "react";
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
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [categories, setCategories] = useState([]);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <div className="flex flex-col justify-center items-center mt-16">
      <div className="w-full flex justify-end mr-[220px]">
        <AdminNavBar />
      </div>
      <div className="text-center">
        <h1 className="text-3xl font-semibold">Create a Product</h1>
        <p className="text-md text-gray-500">Add new products to your store</p>
      </div>
      <form className="flex flex-col shadow-lg p-9 border-t-4 border-blue-500 rounded-lg mt-6">
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
                <input
                  type="text"
                  placeholder="Product Brand"
                  className="border rounded-md h-[45px] pr-12 p-2 w-[290px]"
                  value={categories}
                  onChange={(e) => setCategories(e.target.value)}
                />
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
            className="w-full border p-2 bg-blue-400 text-white rounded-md font-semibold"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProduct;
