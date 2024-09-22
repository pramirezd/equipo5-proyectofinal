\c postgres

-- SELECT pg_terminate_backend(pid)
-- FROM pg_stat_activity
-- WHERE datname = 'ecommerce_g5'
--   AND pid <> pg_backend_pid();

DROP DATABASE IF EXISTS ecommerce_g5;

CREATE DATABASE ecommerce_g5;

-- \c ecommerce_g5;

-- -- Crear tabla de usuarios
-- CREATE TABLE users (
--     id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
--     name TEXT NOT NULL,
--     lastname TEXT NOT NULL,
--     address TEXT,
--     phone TEXT,
--     email TEXT UNIQUE NOT NULL,
--     password TEXT NOT NULL,
--     isadmin BOOLEAN DEFAULT FALSE
-- );

-- -- Crear tabla de categorías
-- CREATE TABLE categories (
--     id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
--     name TEXT UNIQUE NOT NULL
-- );

-- -- Crear tabla de productos con category_id
-- CREATE TABLE products (
--     id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
--     name TEXT NOT NULL,
--     description TEXT,
--     price NUMERIC NOT NULL,
--     stock INTEGER,
--     img_url TEXT,
--     brand TEXT,
--     category_id BIGINT REFERENCES categories(id) ON DELETE CASCADE
-- );

-- -- Crear tabla de carritos
-- CREATE TABLE IF NOT EXISTS carts (
--     id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
--     user_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     CONSTRAINT unique_user_cart UNIQUE (user_id) -- Definición correcta de la restricción UNIQUE
-- );

-- -- Crear tabla de productos en el carrito
-- CREATE TABLE cart_product (
--     id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
--     cart_id BIGINT REFERENCES carts(id) ON DELETE CASCADE,
--     product_id BIGINT REFERENCES products(id) ON DELETE CASCADE,
--     quantity INTEGER NOT NULL,
--     CONSTRAINT unique_cart_product UNIQUE (cart_id, product_id) -- Agregar restricción UNIQUE
-- );

-- -- Crear tabla de órdenes
-- CREATE TABLE orders (
--     id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
--     user_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
--     total NUMERIC NOT NULL,
--     order_state TEXT NOT NULL,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );

-- -- Crear tabla de relación entre órdenes y productos
-- CREATE TABLE order_product (
--     id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
--     order_id BIGINT REFERENCES orders(id) ON DELETE CASCADE,
--     product_id BIGINT REFERENCES products(id) ON DELETE CASCADE,
--     quantity INTEGER NOT NULL
-- );

-- -- Crear tabla de favoritos
-- CREATE TABLE favorites (
--     id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
--     user_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
--     product_id BIGINT REFERENCES products(id) ON DELETE CASCADE,
--     CONSTRAINT unique_favorite UNIQUE (user_id, product_id)
-- );

-- -- Insertar datos en la tabla de usuarios con contraseñas cifradas
-- INSERT INTO users (name, lastname, address, phone, email, password, isadmin) VALUES
-- ('test', 'user', '123 Test St', '999999999', 'test@example.com', '$2b$10$Fxmpe2lbY7e6VRS5RsxmWO.fIni.yvFV7WeO68dYnxM9Sd8zk1j6K', TRUE),
-- ('Juan', 'Pérez', 'Av. Libertador 123, Santiago', '987654321', 'juan.perez1@example.com', '$2b$10$g93Wl6K6./XVFbCT7LU8YO2rQv.B/5/JpG7XvzMN2WbUQUUwLtOg2', FALSE),
-- ('María', 'González', 'Calle Falsa 456, Viña del Mar', '912345678', 'maria.gonzalez1@example.com', '$2b$10$g93Wl6K6./XVFbCT7LU8YO2rQv.B/5/JpG7XvzMN2WbUQUUwLtOg2', FALSE),
-- ('Carlos', 'Sánchez', 'Pasaje Los Cedros 789, Concepción', '934567890', 'carlos.sanchez1@example.com', '$2b$10$g93Wl6K6./XVFbCT7LU8YO2rQv.B/5/JpG7XvzMN2WbUQUUwLtOg2', TRUE),
-- ('Laura', 'Rodríguez', 'Av. Las Condes 111, Santiago', '956789012', 'laura.rodriguez1@example.com', '$2b$10$g93Wl6K6./XVFbCT7LU8YO2rQv.B/5/JpG7XvzMN2WbUQUUwLtOg2', TRUE),
-- ('Pedro', 'Gutiérrez', 'Calle Mayor 321, Valparaíso', '987654322', 'pedro.gutierrez@example.com', '$2b$10$g93Wl6K6./XVFbCT7LU8YO2rQv.B/5/JpG7XvzMN2WbUQUUwLtOg2', FALSE),
-- ('Ana', 'López', 'Av. Las Américas 654, Santiago', '912345679', 'ana.lopez@example.com', '$2b$10$g93Wl6K6./XVFbCT7LU8YO2rQv.B/5/JpG7XvzMN2WbUQUUwLtOg2', FALSE),
-- ('Luis', 'Martínez', 'Calle Real 987, La Serena', '934567891', 'luis.martinez@example.com', '$2b$10$g93Wl6K6./XVFbCT7LU8YO2rQv.B/5/JpG7XvzMN2WbUQUUwLtOg2', FALSE),
-- ('Elena', 'Hernández', 'Av. Providencia 333, Santiago', '956789013', 'elena.hernandez@example.com', '$2b$10$g93Wl6K6./XVFbCT7LU8YO2rQv.B/5/JpG7XvzMN2WbUQUUwLtOg2', FALSE),
-- ('Diego', 'Ramírez', 'Pasaje del Sol 123, Antofagasta', '987654323', 'diego.ramirez@example.com', '$2b$10$g93Wl6K6./XVFbCT7LU8YO2rQv.B/5/JpG7XvzMN2WbUQUUwLtOg2', FALSE),
-- ('Marta', 'Jiménez', 'Calle Central 456, Iquique', '912345680', 'marta.jimenez@example.com', '$2b$10$g93Wl6K6./XVFbCT7LU8YO2rQv.B/5/JpG7XvzMN2WbUQUUwLtOg2', FALSE);

-- -- Insertar datos en la tabla de categorías
-- INSERT INTO categories (name) VALUES
-- ('Selecciones'),
-- ('Premiere League'),
-- ('Liga Chilena');

-- -- Insertar datos en la tabla de productos con category_id
-- INSERT INTO products (name, description, price, stock, img_url, brand, category_id) VALUES
-- ('Seleccion Argentina', '¡Tu Camiseta Argentina Adidas Local 24/25 puede ser tuya!', 65990, 50, 'argentina.jpg', 'Adidas', 1),
-- ('Seleccion Brasileña', '¡Tu Camiseta Brasil Nike Local 24/25 puede ser tuya!', 65990, 50, 'brasil.jpg', 'Nike', 1),
-- ('Seleccion Chilena', '¡Tu Camiseta Selección Chilena Adidas Local 24/25 puede ser tuya!', 65990, 50, 'chile.jpg', 'Adidas', 1),
-- ('Seleccion Japón Dragón Ball', '¡Tu Camiseta Japón Adidas Dragón Ball Versión Jugador puede ser tuya!', 65990, 50, 'japon.jpg', 'Adidas', 1),
-- ('Chelsea', '¡Tu Camiseta Chelsea Nike Local 24/25 puede ser tuya!', 65990, 50, 'chelsea.jpg', 'Nike', 2),
-- ('Manchester City', '¡Tu Camiseta Manchester City Puma Local 24/25 puede ser tuya!', 65990, 50, 'city.jpg', 'Puma', 2),
-- ('Liverpool', '¡Tu Camiseta Liverpool Nike Local 24/25 puede ser tuya!', 65990, 50, 'liverpool.jpg', 'Nike', 2),
-- ('Universidad Católica', '¡Tu Camiseta Universidad Católica Puma Local 24/25 puede ser tuya!', 65990, 50, 'catolica.jpg', 'Puma', 3),
-- ('Universidad de Chile', '¡Tu Camiseta Universidad de Chile Adidas Local 24/25 puede ser tuya!', 65990, 50, 'udechile.jpg', 'Adidas', 3),
-- ('Colo-Colo', '¡Tu Camiseta Colo Colo Adidas Local 24/25 puede ser tuya!', 65990, 50, 'colo-colo.jpg', 'Adidas', 3);