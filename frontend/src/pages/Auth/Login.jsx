import React, { useState } from "react";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
// Importar la imagen
import welcomeImage from "../../img/Welcome Image.png";
// Importar el contexto de usuario
import { useAuth } from "../../context/userContext";
import { Link, useNavigate } from "react-router-dom";
// Toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



//Agregar capa de seguridad para verificar la validacion de datos y estructuras con JOI (NPM JOI)

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, autenticado } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar campos vacíos
    if (!email || !password) {
      toast.error("Por favor, ingrese el correo electrónico y la contraseña.");
      return;
    }

    try {
      await login(email, password);
      toast.success("Inicio de sesión exitoso");
      setEmail("");
      setPassword("");
      navigate("/profile");
    } catch (error) {

      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Error al iniciar sesión");
      }
    }
  };

  return (
    <div className="flex flex-col justify-center items-center mt-7">
      {/* Mensaje de Bienvenida para el Login */}
      <div className="text-center">
        <h1 className="text-3xl font-semibold">Hello! We miss you</h1>
        <p className="text-md text-gray-500">The best Ecommerce platform</p>
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col shadow-lg p-7 items-center border-t-4 border-blue-500 rounded-lg mt-7"
      >
        {/* Contenedor para los input */}
        <div className="flex flex-col gap-5 items-center">
          {/* Contenedor para la imagen */}
          <div>
            <img src={welcomeImage} alt="Welcome" className="w-[200px]" />
          </div>
          {/* Input para el email */}
          <div className="flex flex-col">
            <label className="font-semibold text-gray-500">Email</label>
            <div className="relative">
              <input
                type="text"
                placeholder="Type Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border rounded-md h-[45px] pr-12 p-2 w-[330px]"
              />
              <MdEmail className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-400 text-blue-900 p-2 rounded-full text-3xl" />
            </div>
          </div>
          {/* Input para la contraseña */}
          <div className="flex flex-col">
            <label className="font-semibold text-gray-500">Password</label>
            <div className="relative">
              <input
                type="password"
                placeholder="Type Your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border rounded-md h-[45px] pr-12 p-2 w-[330px]"
              />
              <RiLockPasswordFill className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-400 text-blue-900 p-2 rounded-full text-3xl" />
            </div>
          </div>
        </div>
        {/* Botón para Iniciar Sesión */}
        <div className="flex flex-col justify-center mt-7 w-full">
          <button type="submit" className="w-full border p-2 bg-blue-500 text-white rounded-md">
            Sign In
          </button>
          <p className="text-center text-gray-500 mt-3">
            You don't have an account?{" "}
            <Link to={"/register"} className="font-semibold text-black">
              Sign Up
            </Link>
          </p>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;
