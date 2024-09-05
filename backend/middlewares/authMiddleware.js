import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const authToken = async (req, res, next) => {
  try {
    //Primero obtener el token
    const token = req.cookies.token_access;
    if (!token) {
      return res.status(403).json({
        message: "Este usuario no tiene un token",
      });
    }
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      message: "Token no válido",
    });
  }
};
const isAdmin = (req, res, next) => {
  const user = req.user;
  if (!user || !user.isAdmin) {
    return res.status(401).json({
      message: "Acceso denegado, solo administradores",
      admin: user.isAdmin,
    });
  }
  next();
};

export const AuthMiddleware = {
  authToken,
  isAdmin,
};
