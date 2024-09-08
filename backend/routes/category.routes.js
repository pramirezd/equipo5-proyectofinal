import { categoryController } from "../controllers/categoryController.js";
import express from "express";
import { AuthMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

//Ruta para obtener las categorias
router.get("/", categoryController.categories);

//Ruta para obtener categoria por id
router.get("/:category_id", categoryController.categoryById);

//Ruta para crear una categoria
router.post("/", AuthMiddleware.isAdmin, categoryController.createCategory);

//Ruta para eliminar una categoria
router.delete(
  "/:category_id",
  AuthMiddleware.isAdmin,
  categoryController.removeCategory
);

export default router;
