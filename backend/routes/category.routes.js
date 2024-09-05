import { categoryController } from "../controllers/categoryController.js";
import express from 'express'

const router = express.Router();

//Ruta para obtener las categorias
router.get('/', categoryController.categories)

//Ruta para crear una categoria
router.post('/', categoryController.createCategory)

export default router;