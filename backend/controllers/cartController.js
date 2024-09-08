import { cartModel } from "../models/cartModel.js";

//Obtener el carro por usuario
const getCart = async (req, res) => {
  //Obtener la informacion del user
  const { user_id } = req.params;
  try {
    const cart = await cartModel.getUserCart(user_id);
    return res.status(200).json({
      message: "Carrito del usuario",
      cart,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};
//Agregar productos al carrito
const addToCart = async (req, res) => {
  const { user_id } = req.params;
  const { product_id, quantity } = req.body;
  try {
    const cart = await cartModel.addProduct(user_id, product_id, quantity);
    return res.status(200).json({
      message: "Producto Añadido Correctamente",
      cart,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};
const removeProduct = async (req, res) => {
  const { user_id, product_id } = req.params;
  try {
    const result = await cartModel.removeProduct(user_id, product_id);
    return res.status(200).json({
      message: result.message, // Muestra el mensaje adecuado según si el producto fue eliminado o no
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};

export const cartController = {
  getCart,
  addToCart,
  removeProduct,
};
