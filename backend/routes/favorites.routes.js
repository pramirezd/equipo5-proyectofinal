import { favController } from "../controllers/favoritesController.js";
import express from "express";

import { AuthMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get(
  "/user/:user_id",
  // AuthMiddleware.authToken,
  favController.getFovorites
);

router.post(
  "/user/:user_id",
  // AuthMiddleware.authToken,
  favController.addFavoriteUserProduct
);

router.delete(
  "/user/:user_id/product/:product_id",
  // AuthMiddleware.authToken,
  favController.removeFavoriteProduct
);

export default router;
