import { orderController } from "../controllers/orderController.js";
import express from "express";
import { AuthMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

//Ruta para obtener todas las ordenes
router.get("/allOrders", AuthMiddleware.isAdmin, orderController.getAllOrders);

//Ruta para obtener las ordenes de un usuario
router.get(
  "/user/:user_id",
  AuthMiddleware.authToken,
  orderController.getUserOrders
);

//Ruta para crear una orden
router.post(
  "/user/:user_id",
  AuthMiddleware.authToken,
  orderController.addOrder
);

//Ruta para actualizar una orden
router.put("/:order_id", AuthMiddleware.isAdmin, orderController.updateOrder);

//Ruta para eliminar una orden
router.delete("/:order_id", orderController.deleteOrder);

export default router;
