import pkg from "pg";
import dotenv from "dotenv";
dotenv.config();
const { Pool } = pkg;

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: process.env.DB_PORT,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});
pool
  .connect()
  .then(() => {
    console.log("Conexion exitosa con la DB");
  })
  .catch((error) => {
    console.log("Error al conectar a la base de datos", error);
  });
export default pool;
