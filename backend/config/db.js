import pkg from "pg";
import dotenv from "dotenv";
dotenv.config();
const { Pool } = pkg;
import bcrypt from "bcrypt";

export const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: process.env.DB_PORT,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

// Setup inicial: crear tablas y datos
export const setupDatabase = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
          id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
          name TEXT NOT NULL,
          lastname TEXT NOT NULL,
          address TEXT,
          phone TEXT,
          email TEXT UNIQUE NOT NULL,
          password TEXT NOT NULL,
          isadmin BOOLEAN DEFAULT FALSE
      );

      -- Crear tabla de categorías
      CREATE TABLE IF NOT EXISTS categories (
          id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
          name TEXT UNIQUE NOT NULL
      );

      -- Crear tabla de productos con category_id
      CREATE TABLE IF NOT EXISTS products (
          id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
          name TEXT NOT NULL,
          description TEXT,
          price NUMERIC NOT NULL,
          stock INTEGER,
          img_url TEXT,
          brand TEXT,
          category_id BIGINT REFERENCES categories(id) ON DELETE CASCADE
      );

      -- Crear tabla de carritos
      CREATE TABLE IF NOT EXISTS carts (
          id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
          user_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          CONSTRAINT unique_user_cart UNIQUE (user_id) -- Definición correcta de la restricción UNIQUE
      );

      -- Crear tabla de productos en el carrito
      CREATE TABLE IF NOT EXISTS cart_product (
          id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
          cart_id BIGINT REFERENCES carts(id) ON DELETE CASCADE,
          product_id BIGINT REFERENCES products(id) ON DELETE CASCADE,
          quantity INTEGER NOT NULL,
          CONSTRAINT unique_cart_product UNIQUE (cart_id, product_id) -- Agregar restricción UNIQUE
      );

      -- Crear tabla de órdenes
      CREATE TABLE IF NOT EXISTS orders (
          id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
          user_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
          total NUMERIC NOT NULL,
          order_state TEXT NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      -- Crear tabla de relación entre órdenes y productos
      CREATE TABLE IF NOT EXISTS order_product (
          id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
          order_id BIGINT REFERENCES orders(id) ON DELETE CASCADE,
          product_id BIGINT REFERENCES products(id) ON DELETE CASCADE,
          quantity INTEGER NOT NULL
      );

      -- Crear tabla de favoritos
      CREATE TABLE IF NOT EXISTS favorites (
          id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
          user_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
          product_id BIGINT REFERENCES products(id) ON DELETE CASCADE,
          CONSTRAINT unique_favorite UNIQUE (user_id, product_id)
      );
    `);

    // Insertar datos iniciales
    const hashedPassword = await bcrypt.hash(process.env.APP_TEST_PASSWORD, 10);

    await pool.query(
      `
      INSERT INTO users (name, lastname, address, phone, email, password, isadmin) VALUES
      ('Admin', 'user', '123 Test St', '999999999', '${process.env.APP_TEST_EMAIL}', $1, TRUE)
      ON CONFLICT DO NOTHING;
    `,
      [hashedPassword]
    );

    await pool.query(`
      INSERT INTO categories (name) VALUES
      ('Selecciones'),
      ('Premiere League'),
      ('Liga Chilena')
      ON CONFLICT DO NOTHING;
    `);

    const insertProductsIfEmpty = async () => {
      try {
        const { rows } = await pool.query("SELECT COUNT(*) FROM products");
        const count = parseInt(rows[0].count, 10);

        if (count === 0) {
          await pool.query(`
            INSERT INTO products (name, description, price, stock, img_url, brand, category_id) VALUES
            ('Seleccion Argentina', '¡Tu Camiseta Argentina Adidas Local 24/25 puede ser tuya!', 65990, 50, 'argentina.jpg', 'Adidas', 1),
            ('Seleccion Brasileña', '¡Tu Camiseta Brasil Nike Local 24/25 puede ser tuya!', 65990, 50, 'brasil.jpg', 'Nike', 1),
            ('Seleccion Chilena', '¡Tu Camiseta Selección Chilena Adidas Local 24/25 puede ser tuya!', 65990, 50, 'chile.jpg', 'Adidas', 1),
            ('Seleccion Japón Dragón Ball', '¡Tu Camiseta Japón Adidas Dragón Ball Versión Jugador puede ser tuya!', 65990, 50, 'japon.jpg', 'Adidas', 1),
            ('Chelsea', '¡Tu Camiseta Chelsea Nike Local 24/25 puede ser tuya!', 65990, 50, 'chelsea.jpg', 'Nike', 2),
            ('Manchester City', '¡Tu Camiseta Manchester City Puma Local 24/25 puede ser tuya!', 65990, 50, 'city.jpg', 'Puma', 2),
            ('Liverpool', '¡Tu Camiseta Liverpool Nike Local 24/25 puede ser tuya!', 65990, 50, 'liverpool.jpg', 'Nike', 2),
            ('Universidad Católica', '¡Tu Camiseta Universidad Católica Puma Local 24/25 puede ser tuya!', 65990, 50, 'catolica.jpg', 'Puma', 3),
            ('Universidad de Chile', '¡Tu Camiseta Universidad de Chile Adidas Local 24/25 puede ser tuya!', 65990, 50, 'udechile.jpg', 'Adidas', 3),
            ('Colo-Colo', '¡Tu Camiseta Colo Colo Adidas Local 24/25 puede ser tuya!', 65990, 50, 'colo-colo.jpg', 'Adidas', 3)
            ON CONFLICT DO NOTHING;
          `);
          console.log("Datos insertados en la tabla products.");
        } else {
          console.log(
            "La tabla products ya tiene datos, no se realizó ninguna inserción."
          );
        }
      } catch (error) {
        console.error("Error al insertar los productos:", error.message);
      }
    };

    insertProductsIfEmpty();

    console.log("Setup de base de datos completado");
  } catch (error) {
    console.error("Error en el setup de la base de datos:", error.message);
    process.exit(1);
  }
};
