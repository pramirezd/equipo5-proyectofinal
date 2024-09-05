import { cartModel } from "../models/cartModel.js";

//Obtener el carro por usuario
const getCart = async (req, res) => {
  //Obtener la informacion del user
  const { id } = req.user;
  try {
    const cart = await cartModel.getUserCart(id);
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
  const { id } = req.user;
  const { product_id, quantity } = req.body;
  try {
    const cart = await cartModel.addProduct(id, product_id, quantity);
    return res.status(200).json({
      message: "Producto Añadido Correctamente",
      cart,
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
  addToCart
};
