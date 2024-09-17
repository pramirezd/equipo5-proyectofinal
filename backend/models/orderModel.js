import pool from "../config/db.js";

//Obtener las ordenes por usuario

const getUserOrders = async (user_id) => {
  try {
    const query = `
      SELECT 
          o.id,
          o.total,
          o.order_state,
          o.created_at,
          json_agg(json_build_object('product_name', p.name, 'quantity', op.quantity)) AS order_detail
      FROM orders o
      LEFT JOIN order_product op ON o.id = op.order_id
      LEFT JOIN products p ON op.product_id = p.id
      WHERE o.user_id = $1
      GROUP BY o.id, o.total, o.order_state, o.created_at
      ORDER BY o.id DESC;
        `;
    const response = await pool.query(query, [user_id]);
    return response.rows;
  } catch (error) {
    console.error(error);
    throw new Error("Hubo un error con la operacion GETUSERORDERS");
  }
};

//Obtener todas las ordenes

const getAllOrders = async () => {
  try {
    const query = `
      select o.id order_id,
          u.name,
          u.lastname,
          u.email,
          o.total,
          o.order_state,
          created_at
      from orders o
      left join users u on o.user_id = u.id
        `;
    const response = await pool.query(query);
    return response.rows;
  } catch (error) {
    console.error(error);
    throw new Error("Hubo un error con la operacion GETALLORDERS");
  }
};

// Crear una orden nueva por usuario

const addOrder = async (user_id, total, order_state, products) => {
  const client = await pool.connect(); // Iniciar una transacción
  try {
    // Iniciar la transacción
    await client.query("BEGIN");

    // 1. Insertar la orden en la tabla orders
    const orderQuery = `
      INSERT INTO orders (user_id, total, order_state)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;
    const orderResponse = await client.query(orderQuery, [
      user_id,
      total,
      order_state,
    ]);
    const order = orderResponse.rows[0]; // Obtener la fila completa de la orden

    // 2. Insertar los productos en la tabla order_product
    const orderProductQuery = `
      INSERT INTO order_product (order_id, product_id, quantity)
      VALUES ($1, $2, $3);
    `;

    for (const product of products) {
      const { product_id, quantity } = product;
      await client.query(orderProductQuery, [order.id, product_id, quantity]);
    }

    // 3. Confirmar la transacción
    await client.query("COMMIT");

    // Retornar los detalles de la orden creada
    return {
      order_id: order.id,
      user_id: order.user_id,
      total: order.total,
      order_state: order.order_state,
      created_at: order.created_at,
    };
  } catch (error) {
    // En caso de error, revertir la transacción
    await client.query("ROLLBACK");
    console.error("Error en la operación ADDORDER:", error);
    throw new Error("Hubo un error con la operación ADDORDER");
  } finally {
    client.release(); // Liberar el cliente
  }
};

// Actualizar orden existente por id de usuario

const updateOrder = async (order_id, order_state) => {
  try {
    const query = `
        UPDATE orders
        SET order_state = $2
        WHERE id = $1
        RETURNING *;
      `;
    const response = await pool.query(query, [order_id, order_state]);
    return response.rows[0];
  } catch (error) {
    console.error("Error en la operación UPDATEORDER:", error);
    throw new Error("Hubo un error con la operación UPDATEORDER");
  }
};

// Eliminar orden por id de usuario

const deleteOrder = async (order_id) => {
  try {
    const query = `
        DELETE FROM orders
        WHERE id = $1
        RETURNING *;
      `;
    const response = await pool.query(query, [order_id]);
    console.log(response);
    return response.rows[0];
  } catch (error) {
    console.error("Error en la operación DELETEORDER:", error);
    throw new Error("Hubo un error con la operación DELETEORDER");
  }
};

//Exportar modelo
export const orderModel = {
  getUserOrders,
  getAllOrders,
  addOrder,
  updateOrder,
  deleteOrder,
};
