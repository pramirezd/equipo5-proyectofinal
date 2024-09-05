import pool from "../config/db.js";

//Obtener los carritos por usuario

const getUserCart = async (id) => {
  try {
    const query = `
            SELECT cp.id, p.name, p.price, cp.quantity
            FROM carts c
            JOIN cart_product cp ON c.id = cp.cart_id
            JOIN products p ON cp.product_id = p.id
            WHERE c.user_id =$1
        `;
    const response = await pool.query(query, [id]);
    return response.rows;
  } catch (error) {
    console.error(error);
    throw new Error("Hubo un error con la operacion GETUSERCART");
  }
};

//Agregar un producto al carrito
const addProduct = async (user_id, product_id, quantity) => {
  try {
    // Verifica si el carrito del usuario existe o créalo
    const cartQuery = `
        INSERT INTO carts (user_id)
        VALUES ($1)
        ON CONFLICT (user_id) DO NOTHING
        RETURNING id;
      `;
    const cartResult = await pool.query(cartQuery, [user_id]);
    const cart_id =
      cartResult.rows.length > 0
        ? cartResult.rows[0].id
        : (
            await pool.query("SELECT id FROM carts WHERE user_id = $1", [
              user_id,
            ])
          ).rows[0].id;

    // Agrega o actualiza el producto en el carrito
    const query = `
        INSERT INTO cart_product (cart_id, product_id, quantity)
        VALUES ($1, $2, $3)
        ON CONFLICT (cart_id, product_id)
        DO UPDATE SET quantity = cart_product.quantity + EXCLUDED.quantity
        RETURNING *;
      `;
    const response = await pool.query(query, [cart_id, product_id, quantity]);
    return response.rows[0];
  } catch (error) {
    console.error("Error en la operación ADDPRODUCT:", error);
    throw new Error("Hubo un error con la operación ADDPRODUCT");
  }
};
export const cartModel = {
  getUserCart,
  addProduct,
};
