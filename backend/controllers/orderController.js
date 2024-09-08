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

// Obtener todas las ordenes

const getAllOrders = async (req, res) => {
  try {
    const orders = await orderModel.getAllOrders();
    return res.status(200).json({
      message: "Todas las ordenes",
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
  const { total, order_state, products } = req.body;

  // Validación: Verifica que al menos un producto esté presente
  if (!products || products.length === 0) {
    return res.status(400).json({
      message: "Debe agregar al menos un producto a la orden",
    });
  }

  try {
    // Llama a la función del modelo que crea la orden y agrega los productos
    const order = await orderModel.addOrder(
      user_id,
      total,
      order_state,
      products
    );

    // Devolver una respuesta clara con el ID de la orden creada
    return res.status(201).json({
      message: "Orden creada correctamente",
      order_id: order.order_id, // Devolver el ID de la orden creada
      total: order.total,
      order_state: order.order_state,
      created_at: order.created_at,
    });
  } catch (error) {
    // Manejar errores
    console.error("Error en el controlador ADDORDER:", error);
    return res.status(500).json({
      message: "Error interno del servidor",
      error: error.message,
    });
  }
};

// Actualizar una orden existente por id de usuario

const updateOrder = async (req, res) => {
  const { order_id } = req.params;
  const { order_state } = req.body;
  try {
    const order = await orderModel.updateOrder(order_id, order_state);
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
};

// Eliminar orden por id de usuario
const deleteOrder = async (req, res) => {
  const { order_id } = req.params;
  try {
    await orderModel.deleteOrder(order_id);
    return res.status(200).json({
      message: "Orden eliminada correctamente",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};

export const orderController = {
  getUserOrders,
  getAllOrders,
  addOrder,
  updateOrder,
  deleteOrder,
};
