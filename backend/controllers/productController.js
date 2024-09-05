import { productModel } from "../models/productModel.js";
import { categoryModel } from "../models/categoryModel.js";
const products = async (req, res) => {
  try {
    const products = await productModel.getProducts();
    return res.status(200).json(products);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};
const product = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await productModel.getProductById(id);
    if (!product) {
      return res.status(400).json({
        message: "Producto no encontrado",
      });
    }
    return res.status(200).json(product);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};
const createProduct = async (req, res) => {
  const { name, description, price, stock, category_id, brand } = req.body;
  const img_url = req.file ? req.file.path : null;
  try {
    const createProduct = await productModel.createProduct({
      name,
      description,
      price,
      stock,
      category_id,
      img_url,
      brand,
    });
    return res.status(201).json(createProduct);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};
const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await productModel.getProductById(id);
    if (!product) {
      return res.status(404).json({
        message: "Producto no encontrado",
      });
    }
    const deleteProduct = await productModel.deleteProductById(id);
    return res.status(200).json({
      message: "Producto eliminado correctamente",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};
const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, stock, category_id, brand } = req.body;
  const img_url = req.file ? req.file.path : null;

  const fieldsToUpdate = {};
  if (name) fieldsToUpdate.name = name;
  if (description) fieldsToUpdate.description = description;
  if (price) fieldsToUpdate.price = price;
  if (stock) fieldsToUpdate.stock = stock;
  if (category_id) fieldsToUpdate.category_id = category_id;
  if (brand) fieldsToUpdate.brand = brand;
  if (img_url) fieldsToUpdate.img_url = img_url;

  try {
    const product = await productModel.getProductById(id);
    if (!product) {
      return res.status(404).json({
        message: "Producto no encontrado",
      });
    }
    const updatedProduct = await productModel.updateProduct(fieldsToUpdate, id);

    return res.status(200).json({
      message: "Producto actualizado correctamente",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("Error al actualizar el producto:", error);
    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};
export const productController = {
  products,
  product,
  createProduct,
  deleteProduct,
  updateProduct,
};
