import pool from "../config/db.js";

const checkIfFavoriteExists = async (user_id, product_id) => {
  try {
    const query =
      "SELECT 1 FROM favorites WHERE user_id = $1 AND product_id = $2";
    const values = [user_id, product_id];
    const response = await pool.query(query, values);
    return response.rowCount > 0;
  } catch (error) {
    console.error(error);
    throw new Error("Error al verificar si el favorito existe");
  }
};

const addFavoriteUserProduct = async (user_id, product_id) => {
  try {
    const favoriteExists = await checkIfFavoriteExists(user_id, product_id);
    if (favoriteExists) {
      return {
        message: "Este producto ya está en la lista de favoritos del usuario",
      };
    }
    const query =
      "INSERT INTO favorites(user_id, product_id) VALUES($1, $2) RETURNING *";
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
          p.price, p.stock,
          p.img_url, p.brand,
          c.name as category_name
      FROM favorites f
      LEFT JOIN products p ON f.product_id = p.id
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE user_id = $1
      `,
      [user_id]
    );
    return query.rows[0];
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
