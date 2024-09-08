import React from "react";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
// Importar la imagen
import welcomeImage from '../../img/Welcome Image.png'
const Login = () => {
  return (
    <div className="flex flex-col justify-center items-center mt-7">
      {/* Mensaje de Bienvenida para el Login */}
      <div className="text-center">
        <h1 className="text-3xl font-semibold">Hello! We miss you</h1>
        <p className="text-md text-gray-500">
          The best Ecommerce platform
        </p>
      </div>
      <form className="flex flex-col shadow-lg p-7 items-center border-t-4 border-blue-500 rounded-lg mt-7">
        {/* Contenedor para los input */}
        <div className="flex flex-col gap-5 items-center">
          {/* Contenedor para la imagen */}
          <div  >
            <img src={welcomeImage} alt="" className="w-[200px]" />
          </div>
          {/* Input para el email */}
          <div className="flex flex-col">
            <label className="font-semibold text-gray-500">Email</label>
            <div className="relative">
              <input
                type="text"
                placeholder="Type Your Email"
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
                className="border rounded-md h-[45px] pr-12 p-2 w-[330px]"
              />
              <RiLockPasswordFill className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-400 text-blue-900 p-2 rounded-full text-3xl" />
            </div>
          </div>
        </div>
        {/* Boton para Iniciar Sesion */}
        <div className="flex flex-col justify-center mt-7 w-full">
          <button className="w-full border p-2 bg-blue-500 text-white rounded-md">
            Sign In
          </button>
          <p className="text-center text-gray-500 mt-3">
            You dont have an account?{" "}
            <span className="text-black font-bold">Sign Up</span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
