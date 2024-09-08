import { cartController } from "../controllers/cartController.js";
import express from "express";
import { AuthMiddleware } from "../middlewares/authMiddleware.js";
const router = express.Router();

//Ruta para obtener los carritos por usuario
router.get("/user/:user_id", AuthMiddleware.authToken, cartController.getCart);
//Ruta para agregar un producto al carrito
router.post(
  "/user/:user_id",
  AuthMiddleware.authToken,
  cartController.addToCart
);
router.delete(
  "/user/:user_id/product/:product_id",
  AuthMiddleware.authToken,
  cartController.removeProduct
);

export default router;
