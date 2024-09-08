import { favoritesModel } from "../models/favoritesModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const addFavoriteUserProduct = async (req, res) => {
  const { user_id } = req.params;
  const { product_id } = req.body;
  try {
    const addUserFavoriteProduct = await favoritesModel.addFavoriteUserProduct(
      user_id,
      product_id
    );
    return res.status(200).json(addUserFavoriteProduct);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};

const removeFavoriteProduct = async (req, res) => {
  const { user_id, product_id } = req.params;
  try {
    const removeFavoriteUserProduct =
      await favoritesModel.removeFavoriteUserProduct(user_id, product_id);
    return res.status(200).json(removeFavoriteUserProduct);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};

const getFovorites = async (req, res) => {
  const { user_id } = req.params;
  try {
    const getUserFavorites = await favoritesModel.getUserFavorites(user_id);
    return res.status(200).json(getUserFavorites);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};

export const favController = {
  addFavoriteUserProduct,
  removeFavoriteProduct,
  getFovorites,
};
