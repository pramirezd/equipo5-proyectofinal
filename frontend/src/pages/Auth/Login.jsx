import React, { useState } from "react"; // Asegúrate de que useState esté importado
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import welcomeImage from "../../img/Welcome Image.png";
import { useAuth } from "../../context/userContext.jsx";

const Login = () => {
  const { login } = useAuth(); // Extrae la función de login del contexto
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevenir que el formulario se recargue

    try {
      // Llama a la función login del contexto con el email y el password
      await login(email, password);
      // Puedes redirigir al usuario a otra página después del login exitoso, por ejemplo:
      // navigate("/dashboard");
    } catch (err) {
      setError("Invalid credentials. Please try again."); // Muestra el error si el login falla
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
        onSubmit={handleLogin} // Asocia la función de login con el evento submit del formulario
        className="flex flex-col shadow-lg p-7 items-center border-t-4 border-blue-500 rounded-lg mt-7"
      >
        {/* Contenedor para los input */}
        <div className="flex flex-col gap-5 items-center">
          {/* Contenedor para la imagen */}
          <div>
            <img src={welcomeImage} alt="" className="w-[200px]" />
          </div>
          {/* Input para el email */}
          <div className="flex flex-col">
            <label className="font-semibold text-gray-500">Email</label>
            <div className="relative">
              <input
                type="email" // Cambié el tipo de texto a email
                placeholder="Type Your Email"
                className="border rounded-md h-[45px] pr-12 p-2 w-[330px]"
                value={email} // Asocia el valor con el estado
                onChange={(e) => setEmail(e.target.value)} // Actualiza el estado cuando el usuario escribe
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
                value={password} // Asocia el valor con el estado
                onChange={(e) => setPassword(e.target.value)} // Actualiza el estado cuando el usuario escribe
              />
              <RiLockPasswordFill className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-400 text-blue-900 p-2 rounded-full text-3xl" />
            </div>
          </div>
        </div>
        {/* Botón para Iniciar Sesión */}
        <div className="flex flex-col justify-center mt-7 w-full">
          <button
            type="submit" // Botón de tipo submit
            className="w-full border p-2 bg-blue-500 text-white rounded-md"
          >
            Sign In
          </button>
          {error && <p className="text-red-500 mt-3">{error}</p>}{" "}
          {/* Muestra el error si hay uno */}
          <p className="text-center text-gray-500 mt-3">
            You don't have an account?{" "}
            <span className="text-black font-bold">Sign Up</span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
