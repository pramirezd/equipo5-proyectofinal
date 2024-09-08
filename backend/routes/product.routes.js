import { productController } from "../controllers/productController.js";
import express from "express";
import upload from "../middlewares/upload.js";
import { AuthMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

//Ruta para obtener todos los productos
router.get("/", productController.products);
//Ruta para obtener un producto mediante el id
router.get("/product/:id", productController.product);
//Crear un producto
router.post(
  "/",
  AuthMiddleware.authToken,
  AuthMiddleware.isAdmin,
  upload.single("image"),
  productController.createProduct
);
//Eliminar un producto
router.delete(
  "/product/:id",
  AuthMiddleware.authToken,
  AuthMiddleware.isAdmin,
  productController.deleteProduct
);
//Actualizar un producto
router.put(
  "/product/:id",
  AuthMiddleware.authToken,
  AuthMiddleware.isAdmin,
  productController.updateProduct
);
export default router;
