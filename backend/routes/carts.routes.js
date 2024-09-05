import { cartController } from "../controllers/cartController.js";
import express from 'express'
import { AuthMiddleware } from "../middlewares/authMiddleware.js";
const router = express.Router();

//Ruta para obtener los carritos por usuario
router.get("/", AuthMiddleware.authToken,cartController.getCart)
//Ruta para agregar un producto al carrito
router.post("/add", AuthMiddleware.authToken, cartController.addToCart)

export default router;