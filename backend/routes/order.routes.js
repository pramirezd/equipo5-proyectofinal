import { orderController } from "../controllers/orderController.js";
import express from 'express'

const router = express.Router();

//Ruta para obtener las ordenes de un usuario
router.get('/orders/user/:user_id', orderController.getUserOrders);

//Ruta para crear una orden
router.post('/orders/user/:user_id', orderController.addOrder);

//Ruta para actualizar una orden
router.put('/orders/:id/user/:user_id', orderController.updateOrder);

//Ruta para eliminar una orden
router.delete('/orders/:id/user/:user_id', orderController.deleteOrder);

export default router;