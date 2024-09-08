import { orderController } from "../controllers/orderController.js";
import express from 'express'

const router = express.Router();

//Ruta para obtener las ordenes de un usuario
router.get('/user/:user_id', orderController.getUserOrders);

//Ruta para obtener todas las ordenes
router.get('/allOrders', orderController.getAllOrders);

//Ruta para crear una orden
router.post('/user/:user_id', orderController.addOrder);

//Ruta para actualizar una orden
router.put('/:id/user/:user_id', orderController.updateOrder);

//Ruta para eliminar una orden
router.delete('/:id/user/:user_id', orderController.deleteOrder);

export default router;