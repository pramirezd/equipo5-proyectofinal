//Importar la base de datos
import pool from "../config/db.js";

const getProducts = async () => {
  try {
    const query = `
      SELECT 	p.id,
          p.name,
          p.description,
          p.brand,
          p.price,
          p.stock,
          'http://localhost:${process.env.DB_PORT}/easycommerce/products/img/' || p.img_url as img_url,
          c.name AS category_name 
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
    `;
    const result = await pool.query(query);
    return result.rows;
  } catch (error) {
    console.error(error);
    throw new Error("Hubo un error con la operación GETPRODUCTS");
  }
};

const getProductById = async (id) => {
  try {
    const query = `
    SELECT 	p.id,
        p.name,
        p.description,
        p.brand,
        p.price,
        p.stock,
        'http://localhost:${process.env.DB_PORT}/easycommerce/products/img/' || p.img_url as img_url,
        c.name AS category_name 
    FROM products p
    LEFT JOIN categories c ON p.category_id = c.id
    WHERE p.id = $1
  `;
    const result = await pool.query(query, [id]);
    return result.rows[0];
  } catch (error) {
    console.error(error);
    throw new Error("Hubo un error con la operaicon GETPRODUCTBYID");
  }
};
const createProduct = async ({
  name,
  description,
  price,
  stock,
  category_id,
  img_url,
  brand,
}) => {
  try {
    const query =
      "INSERT INTO products (name, description, price, stock, category_id, img_url, brand) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING * ";
    const values = [
      name,
      description,
      price,
      stock,
      category_id,
      img_url,
      brand,
    ];
    const response = await pool.query(query, values);
    return response.rows[0];
  } catch (error) {
    console.error(error);
    throw new Error("Hubo un error con la operacion CREATEPRODUCT");
  }
};
const deleteProductById = async (id) => {
  try {
    const query = await pool.query("DELETE FROM products WHERE id = $1", [id]);
    return query.rows[0];
  } catch (error) {
    console.error(error);
    throw new Error("Hubo un error con la operaicon DELETEPRODUCTBYID");
  }
};
const getProductByName = async (name) => {
  try {
    const query = await pool.query("SELECT FROM products WHERE name = $1");
    return query.rows[0];
  } catch (error) {
    console.error(error);
    throw new Error("HUBO UN ERROR CON LA OPERACION GETPRODUCTBYNAME");
  }
};
//Falta terminar
const updateProduct = async (fieldsToUpdate, id) => {
  try {
    const keys = Object.keys(fieldsToUpdate);
    const values = Object.values(fieldsToUpdate);

    const setClause = keys
      .map((key, index) => `${key}=$${index + 1}`)
      .join(", ");

    const result = await pool.query(
      `
      UPDATE products
      SET ${setClause} WHERE id = $${keys.length + 1}
      RETURNING *
      `,
      [...values, id]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error al actualizar el producto:", error);
    throw new Error("Hubo un error con la operación UPDATEPRODUCT");
  }
};
export const productModel = {
  getProducts,
  getProductById,
  deleteProductById,
  createProduct,
  getProductByName,
  updateProduct,
};
