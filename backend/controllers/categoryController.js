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

const categoryById = async (req, res) => {
  const { category_id } = req.params;
  try {
    const category = await categoryModel.getCategorieById(category_id);
    return res.status(200).json(category);
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
      create,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};

const removeCategory = async (req, res) => {
  const { category_id } = req.params;
  console.log("parametros: ", req.params);
  try {
    const remove = await categoryModel.removeCategory(category_id);
    return res.status(200).json({
      remove,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};

export const categoryController = {
  categories,
  categoryById,
  createCategory,
  removeCategory,
};
