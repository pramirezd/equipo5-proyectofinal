import { cartController } from "../controllers/cartController.js";
import express from "express";
import { AuthMiddleware } from "../middlewares/authMiddleware.js";
const router = express.Router();

//Ruta para obtener el carrito con productos
router.get("/", AuthMiddleware.authToken, cartController.getCart);
//Ruta para agregar un producto al carrito
router.post("/add", AuthMiddleware.authToken, cartController.addToCart);
//Ruta para eliminar el producto del carrito
router.delete(
  "/remove/:cartProductId",
  AuthMiddleware.authToken,
  cartController.removeFromCart
);

export default router;
