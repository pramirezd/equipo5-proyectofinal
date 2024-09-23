import { pool } from "../config/db.js";

const getCategories = async () => {
  try {
    const query = await pool.query("SELECT * FROM categories");
    return query.rows;
  } catch (error) {
    console.error(error);
    throw new Error("HUBO UN ERROR CON LA OPERACION CATEGORIES");
  }
};
const createCategory = async (name) => {
  try {
    const query = await pool.query(
      "INSERT INTO categories(name) VALUES($1) RETURNING *",
      [name]
    );
    return query.rows[0];
  } catch (error) {
    console.error(error);
    throw new Error("HUBO UN ERROR CON LA OPERACION CREATECATEGORY");
  }
};
const getCategorieById = async (id) => {
  try {
    const query = await pool.query("SELECT * FROM categories WHERE id = $1", [
      id,
    ]);
    return query.rows[0];
  } catch (error) {
    console.error(error);
    throw new Error("HUBO UN ERROR CON LA OPERACION GETCATEGORYBYID");
  }
};
const removeCategory = async (category_id) => {
  try {
    const query = await pool.query(
      "DELETE FROM categories WHERE id = $1 RETURNING *",
      [category_id]
    );
    return query.rows[0];
  } catch (error) {
    console.error("Error en removeCategory:", error);
    throw new Error(`HUBO UN ERROR CON LA OPERACION DELETECATEGORY ${error}`);
  }
};
export const categoryModel = {
  getCategories,
  createCategory,
  getCategorieById,
  removeCategory,
};
