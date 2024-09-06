import { orderModel } from "../models/orderModel.js";

// Obtener las ordenes de un usuario por ID

const getUserOrders = async (req, res) => {
  const { user_id } = req.params;
  try {
    const orders = await orderModel.getUserOrders(user_id);
    return res.status(200).json({
      message: `Ordenes del usuario ${user_id}`,
      orders,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};

// Crear una orden

const addOrder = async (req, res) => {
  const { user_id } = req.params;
  const { total, order_state } = req.body;
  try {
    const order = await orderModel.addOrder(user_id, total, order_state);
    return res.status(200).json({
      message: "Orden creada correctamente",
      order,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};

// Actualizar una orden existente por id de usuario

const updateOrder = async (req, res) => {
  const { id, user_id } = req.params;
  const { total, order_state } = req.body;
  try {
    const order = await orderModel.updateOrder(id, user_id, total, order_state);
    return res.status(200).json({
      message: "Orden actualizada correctamente",
      order,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
}

// Eliminar orden por id de usuario

const deleteOrder = async (req, res) => {
  const { id, user_id } = req.params;
  try {
    await orderModel.deleteOrder(id, user_id);
    return res.status(200).json({
      message: "Orden eliminada correctamente",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
}

export const orderController = {
  getUserOrders,
  addOrder,
  updateOrder,
  deleteOrder,
};