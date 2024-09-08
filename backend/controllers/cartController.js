import { cartModel } from "../models/cartModel.js";

//Obtener el carro por usuario
const getCart = async (req, res) => {
  try {
    const { id } = req.user;
    if (!id) {
      return res.status(400).json({ message: "ID de usuario es requerido" });
    }
    const cart = await cartModel.getUserCart(id);
    if (cart) {
      return res.status(200).json(cart);
    } else {
      return res.status(404).json({
        message: "Carrito no encontrado",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};
//Agregar productos al carrito
const addToCart = async (req, res) => {
  try {
    const { id } = req.user;
    const { productId, quantity } = req.body;

    if (!productId || !quantity) {
      return res.status(400).json({
        message: "Datos incompletos, se requiere productId y quantity",
      });
    }
    const cart = await cartModel.getUserCart(id);
    if (!cart.cart) {
      return res.status(404).json({ message: "Carrito no encontrado" });
    }
    const cartId = cart.cart.id;
    const addedProduct = await cartModel.addProductToCart(
      cartId,
      productId,
      quantity
    );
    if (addedProduct) {
      return res.status(200).json({
        message: "Producto agregado al carrito",
        product: addedProduct,
      });
    } else {
      return res
        .status(500)
        .json({ message: "No se pudo agregar el producto al carrito" });
    }
  } catch (error) {
    console.error("Error al agregar producto al carrito: ", error);
    return res
      .status(500)
      .json({ message: "Error al agregar producto al carrito" });
  }
};
//Controlador para eliminar el producto del carrito
const removeFromCart = async (req, res) => {
  try {
    const { cartProductId } = req.params;

    if (!cartProductId) {
      return res
        .status(400)
        .json({ message: "ID del producto en el carrito es requerido" });
    }
    const removedProduct = await cartModel.removeProductFromCart(cartProductId);
    if (removedProduct) {
      return res.status(200).json({
        message: "Producto eliminado del carrito",
        product: removedProduct,
      });
    } else {
      return res
        .status(404)
        .json({ message: "Producto no encontrado en el carrito" });
    }
  } catch (error) {
    console.error("Error al eliminar producto del carrito:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const cartController = {
  getCart,
  addToCart,
  removeFromCart,
};
