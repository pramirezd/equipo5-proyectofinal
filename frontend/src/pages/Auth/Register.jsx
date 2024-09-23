import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Importar useNavigate
//Icons
import { FaUser } from "react-icons/fa";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { FaPhone } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { useAuth } from "../../context/userContext";

const Register = () => {
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { register } = useAuth();
  const navigate = useNavigate();

  // Función de validación del email
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expresión regular para validar el formato del correo
    return emailRegex.test(email);
  };

  const handleRegister = async (e) => {
    e.preventDefault(); // Prevenir que el formulario se recargue

    try {
      // Validar que todos los campos estén llenos
      if (!name || !lastname || !address || !phone || !email || !password) {
        setError("Todos los campos son obligatorios");
        return;
      }

      // Validar el formato del correo electrónico
      if (!validateEmail(email)) {
        setError(
          "El correo electrónico no es válido. Debe tener el formato nombre@mail.com"
        );
        return;
      }

      // Llama a la función register del contexto con todos los datos
      await register(name, lastname, address, phone, email, password);
      // Si el registro es exitoso, redirigir al login
      navigate("/login");
    } catch (err) {
      setError("Error en el registro: " + err.message); // Mostrar el error si el registro falla
    }
  };

  return (
    <div className="flex flex-col justify-center items-center mt-16 ">
      <div className="text-center">
        <h1 className="text-3xl font-semibold">Welcome To EasyCommerce</h1>
        <p className="text-md text-gray-500">The best Ecommerce platform</p>
      </div>
      <form
        onSubmit={handleRegister}
        className="flex flex-col shadow-lg p-9 border-t-4 border-blue-500 rounded-lg mt-6"
      >
        {/* Informacion personal */}
        <p className="font-semibold text-lg mb-4">Personal Information</p>
        <div className="flex flex-col mb-4 p-3">
          {/* Name, Last Name*/}
          <div className="flex gap-12">
            <div className="flex flex-col ">
              <label className="font-semibold text-gray-500">Name</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Type Your Name"
                  className="border rounded-md h-[45px] pr-12 p-2 w-[290px]"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <FaUser className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-400 text-blue-900 p-2 rounded-full text-3xl" />
              </div>
            </div>
            <div className="flex flex-col ">
              <label className="font-semibold text-gray-500">Last Name</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Type Your Last Name"
                  className="border rounded-md h-[45px] pr-12 p-2 w-[290px]"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                />
                <HiOutlinePencilAlt className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-400 text-blue-900 p-2 rounded-full text-3xl" />
              </div>
            </div>
          </div>
          {/* Adress y Phone*/}
          <div className="flex gap-12">
            <div className="flex flex-col ">
              <label className="font-semibold text-gray-500">Phone</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Type Your Phone"
                  className="border rounded-md h-[45px] pr-12 p-2 w-[290px]"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <FaPhone className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-400 text-blue-900 p-2 rounded-full text-3xl" />
              </div>
            </div>
            <div className="flex flex-col ">
              <label className="font-semibold text-gray-500">Address</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Type Your Adress"
                  className="border rounded-md h-[45px] pr-12 p-2 w-[290px]"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
                <FaLocationDot className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-400 text-blue-900 p-2 rounded-full text-3xl" />
              </div>
            </div>
          </div>
        </div>
        {/* Informacion de Sesion */}
        <p className="text-lg font-semibold mb-4">Sesion Information</p>
        <div className="flex flex-col p-3">
          <div className="flex gap-12">
            <div className="flex flex-col">
              <label className="font-semibold text-gray-500">Email</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Type Your Email"
                  className="border rounded-md h-[45px] pr-12 p-2 w-[290px]"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <MdEmail className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-400 text-blue-900 p-2 rounded-full text-3xl" />
              </div>
            </div>
            <div className="flex flex-col">
              <label className="font-semibold text-gray-500">Password</label>
              <div className="relative">
                <input
                  type="password"
                  placeholder="Type Your Password"
                  className="border rounded-md h-[45px] pr-12 p-2 w-[290px]"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <RiLockPasswordFill className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-400 text-blue-900 p-2 rounded-full text-3xl" />
              </div>
            </div>
          </div>
        </div>
        {/* Botones y redireccion al Login */}
        <div className="flex flex-col justify-center mt-7">
          <button className="w-full border p-2 bg-blue-500 text-white rounded-md">
            Sign Up
          </button>
          {error && <p className="text-red-500 mt-3">{error}</p>}{" "}
          <p className="text-center text-gray-500 mt-3">
            You already have an account?{" "}
            <Link to="/login">
              <span className="text-black font-bold">Sign In</span>
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;
