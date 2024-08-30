import pool from "../config/db.js";

//Obtener todos los usuarios
const getUsers = async () => {
  try {
    const query = await pool.query("SELECT * FROM users");
    return query.rows;
  } catch (error) {
    console.error(error);
    throw new Error("Hubo un error con la operacion GETUSERS");
  }
};
const findUser = async (email) => {
  try {
    const query = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    return query.rows[0];
  } catch (error) {
    console.error(error);
    throw new Error("Hubo un error con la operacion FINDUSER");
  }
};
const deleteUser = async (id) => {
  try {
    const query = await pool.query("DELETE FROM users WHERE id = $1", [id]);
    return query.rows[0];
  } catch (error) {
    console.error(error);
    throw new Error("Hubo un error con la operacion DELETEUSER");
  }
};
const createUser = async ({
  name,
  lastname,
  address,
  phone,
  email,
  password,
  isadmin,
}) => {
  try {
    const query =
      "INSERT INTO users(name, lastname, address, phone, email, password, isadmin) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *";
    const values = [name, lastname, address, phone, email, password, isadmin];
    const response = await pool.query(query, values);
    return response.rows[0];
  } catch (error) {
    console.error(error);
    throw new Error("Hubo un error con la operacion CREATEUSER");
  }
};
const getUserById = async (id) => {
  try {
    const query = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    return query.rows[0];
  } catch (error) {
    console.error(error);
    throw new Error("Hubo un error con la operacion GETUSERBYID");
  }
};
const updateUser = async (fieldsToUpdate, id) => {
  try {
    const keys = Object.keys(fieldsToUpdate);
    const values = Object.values(fieldsToUpdate);

    const setClause = keys
      .map((key, index) => `${key}=$${index + 1}`)
      .join(", ");

    const query = await pool.query(
      `
      UPDATE users
      SET ${setClause} WHERE id = $${keys.length + 1}
      RETURNING *
      `,
      [...values, id]
    );
    return query.rows[0];
  } catch (error) {
    console.error(error);
    throw new Error("Hubo un error con la operacion UPDATEUSER");
  }
};
export const userModel = {
  getUsers,
  findUser,
  deleteUser,
  createUser,
  getUserById,
  updateUser,
};
