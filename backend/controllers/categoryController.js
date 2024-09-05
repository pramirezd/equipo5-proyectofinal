import { categoryModel } from "../models/categoryModel.js";

const categories = async (req, res) => {
  try {
    const categories = await categoryModel.getCategories();
    return res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};
const createCategory = async (req, res) => {
  const { name } = req.body;
  try {
    const create = await categoryModel.createCategory(name);
    return res.status(200).json({
      message: "Categoria creada",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};

export const categoryController = {
    categories,
    createCategory
};
