import { pool } from "../config/db.js";

const addFavoriteUserProduct = async (user_id, product_id) => {
  try {
    const query = `
      INSERT INTO favorites(user_id, product_id)
      VALUES($1, $2)
      ON CONFLICT (user_id, product_id) DO NOTHING
      RETURNING *;
      `;
    const values = [user_id, product_id];
    const response = await pool.query(query, values);
    return response.rows;
  } catch (error) {
    console.error(error);
    throw new Error(`Hubo un error con la operacion ADDFAVORITE - ${error}`);
  }
};
const removeFavoriteUserProduct = async (user_id, product_id) => {
  try {
    const query =
      "DELETE FROM favorites WHERE user_id = $1 AND product_id = $2 RETURNING *";
    const values = [user_id, product_id];
    const response = await pool.query(query, values);
    console.log(response);
    if (response.rowCount > 0) {
      return response.rows[0];
    } else {
      return {};
    }
  } catch (error) {
    console.error(error);
    throw new Error("Hubo un error con la operacion REMOVEFAVORITE");
  }
};
const getUserFavorites = async (user_id) => {
  try {
    const query = await pool.query(
      `
      SELECT
          f.product_id,
          p.name,
          p.description,
          p.price,
          p.stock,
          '${process.env.APP_BACKEND_URL}/easycommerce/products/img/' || p.img_url as img_url,
          p.brand,
          c.name as category_name
      FROM favorites f
      LEFT JOIN products p ON f.product_id = p.id
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE user_id = $1
            AND f.product_id is not null
      `,
      [user_id]
    );
    return query.rows;
  } catch (error) {
    console.error(error);
    throw new Error("Hubo un error con la operacion GETUSERFAVORITES");
  }
};
export const favoritesModel = {
  addFavoriteUserProduct,
  removeFavoriteUserProduct,
  getUserFavorites,
};
