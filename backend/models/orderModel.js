import pool from "../config/db.js";

//Obtener las ordenes por usuario

const getUserOrders = async (user_id) => {
  try {
    const query = `
            SELECT o.id, o.user_id, o.created_at, o.total, o.order_state
            FROM orders o
            WHERE o.user_id =$1
        `;
    const response = await pool.query(query, [user_id]);
    return response.rows;
  } catch (error) {
    console.error(error);
    throw new Error("Hubo un error con la operacion GETUSERORDERS");
  }
}

// Crear una orden nueva por usuario

const addOrder = async (user_id, total, order_state) => {
  try {
    const query = `
        INSERT INTO orders (user_id, total, order_state)
        VALUES ($1, $2, $3)
        RETURNING *;
      `;
    const response = await pool.query(query, [user_id, total, order_state]);
    return response.rows[0];
  } catch (error) {
    console.error("Error en la operación ADDORDER:", error);
    throw new Error("Hubo un error con la operación ADDORDER");
  }
}

// Actualizar orden existente por id de usuario

const updateOrder = async (id, user_id, total, order_state) => {
  try {
    const query = `
        UPDATE orders
        SET total = $3, order_state = $4
        WHERE id = $1 AND user_id = $2
        RETURNING *;
      `;
    const response = await pool.query(query, [id, user_id, total, order_state]);
    return response.rows[0];
  } catch (error) {
    console.error("Error en la operación UPDATEORDER:", error);
    throw new Error("Hubo un error con la operación UPDATEORDER");
  }
}

// Eliminar orden por id de usuario

const deleteOrder = async (id, user_id) => {
  try {
    const query = `
        DELETE FROM orders
        WHERE id = $1 AND user_id = $2
        RETURNING *;
      `;
    const response = await pool.query(query, [id, user_id]);
    return response.rows[0];
  } catch (error) {
    console.error("Error en la operación DELETEORDER:", error);
    throw new Error("Hubo un error con la operación DELETEORDER");
  }
}

//Exportar modelo
export const orderModel = {
    getUserOrders,
    addOrder,
    updateOrder,
    deleteOrder
};