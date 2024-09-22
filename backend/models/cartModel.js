import pool from "../config/db.js";

//Obtener los carritos por usuario

const getUserCart = async (id) => {
  try {
    const query = `
            SELECT
              cp.product_id,
              p.name,
              p.description,
              p.price,
              cp.quantity,
              '${process.env.APP_BACKEND_URL}/easycommerce/products/img/' || p.img_url as img_url
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

const removeProduct = async (user_id, product_id) => {
  try {
    // Verificar si el carrito del usuario existe
    const cartQuery = `
      SELECT id FROM carts WHERE user_id = $1;
    `;
    const cartResult = await pool.query(cartQuery, [user_id]);

    // Si el carrito no existe, lanzar un error
    if (cartResult.rows.length === 0) {
      throw new Error("El carrito no existe para este usuario.");
    }

    const cart_id = cartResult.rows[0].id;

    // Eliminar el producto del carrito
    const deleteQuery = `
      DELETE FROM cart_product 
      WHERE cart_id = $1 AND product_id = $2
      RETURNING *;
    `;

    const deleteResult = await pool.query(deleteQuery, [cart_id, product_id]);
    console.log(deleteResult.rows);

    // Si el producto no está en el carrito, devolver un mensaje
    if (deleteResult.rows.length === 0) {
      return { message: "El producto no se encontró en el carrito." };
    }

    return { message: "Producto eliminado del carrito con éxito." };
  } catch (error) {
    console.error("Error al eliminar producto del carrito:", error);
    throw new Error("Hubo un error al eliminar el producto del carrito.");
  }
};

export const cartModel = {
  getUserCart,
  addProduct,
  removeProduct,
};
