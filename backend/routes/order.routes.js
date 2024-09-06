import { orderController } from "../controllers/orderController.js";
import { Router } from 'express'

const orderRouter = Router();

//Ruta para obtener las ordenes de un usuario
orderRouter.get('/orders/:id', orderController.getUserOrders);

//Ruta para crear una orden
orderRouter.post('/orders', orderController.addOrder);

//Ruta para actualizar una orden
orderRouter.put('/orders/:id', orderController.updateOrder);

//Ruta para eliminar una orden
orderRouter.delete('/orders/:id', orderController.deleteOrder);

export default orderRouter;