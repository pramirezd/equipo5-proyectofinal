import { orderController } from "../controllers/orderController.js";
import express from 'express'

const router = express.Router();

//Ruta para obtener las ordenes de un usuario
router.get('/orders', orderController.getUserOrders);

//Ruta para crear una orden
router.post('/orders', orderController.addOrder);

//Ruta para actualizar una orden
router.put('/orders/:id', orderController.updateOrder);

//Ruta para eliminar una orden
router.delete('/orders/:id', orderController.deleteOrder);

export default router;