import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const authToken = async (req, res, next) => {
  try {
    const token =
      req.cookies.token_access || req.headers["authorization"]?.split(" ")[1];
    if (!token) {
      return res.status(403).json({
        message: token,
      });
    }
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;

    const { user_id } = req.params;
    const user = req.user;

    if (user.isAdmin || user_id === user.id) {
      next();
    } else {
      return res.status(403).json({
        message:
          "Acceso denegado, no tienes permisos para acceder a estos datos",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      message: "Token no válido",
    });
  }
};
const isAdmin = (req, res, next) => {
  const token =
    req.cookies.token_access || req.headers["authorization"]?.split(" ")[1];
  const user = jwt.decode(token);
  if (user.isAdmin) {
    next();
  } else {
    return res.status(401).json({
      message: "Acceso denegado, solo administradores",
      admin: user.isAdmin,
    });
  }
};

export const AuthMiddleware = {
  authToken,
  isAdmin,
};
