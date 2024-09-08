\c postgres

SELECT pg_terminate_backend(pid)
FROM pg_stat_activity
WHERE datname = 'ecommerce'
  AND pid <> pg_backend_pid();

DROP DATABASE IF EXISTS ecommerce;
CREATE DATABASE ecommerce;

\c ecommerce;

-- Crear tabla de usuarios
CREATE TABLE users (
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
CREATE TABLE categories (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name TEXT UNIQUE NOT NULL
);

-- Crear tabla de productos con category_id
CREATE TABLE products (
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
CREATE TABLE cart_product (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    cart_id BIGINT REFERENCES carts(id) ON DELETE CASCADE,
    product_id BIGINT REFERENCES products(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL,
    CONSTRAINT unique_cart_product UNIQUE (cart_id, product_id) -- Agregar restricción UNIQUE
);

-- Crear tabla de órdenes
CREATE TABLE orders (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
    total NUMERIC NOT NULL,
    order_state TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear tabla de relación entre órdenes y productos
CREATE TABLE order_product (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    order_id BIGINT REFERENCES orders(id) ON DELETE CASCADE,
    product_id BIGINT REFERENCES products(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL
);

-- Crear tabla de favoritos
CREATE TABLE favorites (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
    product_id BIGINT REFERENCES products(id) ON DELETE CASCADE,
    CONSTRAINT unique_favorite UNIQUE (user_id, product_id)
);

-- Insertar datos en la tabla de usuarios con contraseñas cifradas
INSERT INTO users (name, lastname, address, phone, email, password, isadmin) VALUES
('test', 'user', '123 Test St', '999999999', 'test@example.com', '$2b$10$Fxmpe2lbY7e6VRS5RsxmWO.fIni.yvFV7WeO68dYnxM9Sd8zk1j6K', TRUE),
('Juan', 'Pérez', 'Av. Libertador 123, Santiago', '987654321', 'juan.perez1@example.com', '$2b$10$g93Wl6K6./XVFbCT7LU8YO2rQv.B/5/JpG7XvzMN2WbUQUUwLtOg2', FALSE),
('María', 'González', 'Calle Falsa 456, Viña del Mar', '912345678', 'maria.gonzalez1@example.com', '$2b$10$g93Wl6K6./XVFbCT7LU8YO2rQv.B/5/JpG7XvzMN2WbUQUUwLtOg2', FALSE),
('Carlos', 'Sánchez', 'Pasaje Los Cedros 789, Concepción', '934567890', 'carlos.sanchez1@example.com', '$2b$10$g93Wl6K6./XVFbCT7LU8YO2rQv.B/5/JpG7XvzMN2WbUQUUwLtOg2', TRUE),
('Laura', 'Rodríguez', 'Av. Las Condes 111, Santiago', '956789012', 'laura.rodriguez1@example.com', '$2b$10$g93Wl6K6./XVFbCT7LU8YO2rQv.B/5/JpG7XvzMN2WbUQUUwLtOg2', TRUE),
('Pedro', 'Gutiérrez', 'Calle Mayor 321, Valparaíso', '987654322', 'pedro.gutierrez@example.com', '$2b$10$g93Wl6K6./XVFbCT7LU8YO2rQv.B/5/JpG7XvzMN2WbUQUUwLtOg2', FALSE),
('Ana', 'López', 'Av. Las Américas 654, Santiago', '912345679', 'ana.lopez@example.com', '$2b$10$g93Wl6K6./XVFbCT7LU8YO2rQv.B/5/JpG7XvzMN2WbUQUUwLtOg2', FALSE),
('Luis', 'Martínez', 'Calle Real 987, La Serena', '934567891', 'luis.martinez@example.com', '$2b$10$g93Wl6K6./XVFbCT7LU8YO2rQv.B/5/JpG7XvzMN2WbUQUUwLtOg2', FALSE),
('Elena', 'Hernández', 'Av. Providencia 333, Santiago', '956789013', 'elena.hernandez@example.com', '$2b$10$g93Wl6K6./XVFbCT7LU8YO2rQv.B/5/JpG7XvzMN2WbUQUUwLtOg2', FALSE),
('Diego', 'Ramírez', 'Pasaje del Sol 123, Antofagasta', '987654323', 'diego.ramirez@example.com', '$2b$10$g93Wl6K6./XVFbCT7LU8YO2rQv.B/5/JpG7XvzMN2WbUQUUwLtOg2', FALSE),
('Marta', 'Jiménez', 'Calle Central 456, Iquique', '912345680', 'marta.jimenez@example.com', '$2b$10$g93Wl6K6./XVFbCT7LU8YO2rQv.B/5/JpG7XvzMN2WbUQUUwLtOg2', FALSE);

-- Insertar datos en la tabla de categorías
INSERT INTO categories (name) VALUES
('Electrónica'),
('Ropa'),
('Hogar'),
('Deportes');

-- Insertar datos en la tabla de productos con category_id
INSERT INTO products (name, description, price, stock, img_url, brand, category_id) VALUES
('Smartphone XYZ', 'Último modelo de smartphone con pantalla OLED.', 499.99, 50, 'https://example.com/smartphone_xyz.jpg', 'TechCorp', 1),
('Camiseta Deportiva', 'Camiseta de alto rendimiento para actividades deportivas.', 29.99, 150, 'https://example.com/camiseta_deportiva.jpg', 'SportFit', 2),
('Cafetera Espresso', 'Cafetera automática para espresso de alta calidad.', 89.99, 30, 'https://example.com/cafetera_espresso.jpg', 'CoffeeMax', 3),
('Bicicleta Montaña', 'Bicicleta todo terreno con suspensión avanzada.', 349.99, 20, 'https://example.com/bicicleta_montana.jpg', 'MountainBike Co.', 4),
('Televisor 4K', 'Televisor 4K Ultra HD con HDR.', 599.99, 15, 'https://example.com/televisor_4k.jpg', 'ScreenMaster', 1);

-- Insertar datos en la tabla de carritos
INSERT INTO carts (user_id) VALUES
(1),
(2),
(3),
(4),
(5),
(6),
(7),
(8),
(9),
(10);

-- Insertar datos en la tabla de productos en el carrito
INSERT INTO cart_product (cart_id, product_id, quantity) VALUES
(1, 1, 2),
(2, 2, 1),
(3, 3, 1),
(4, 4, 1),
(5, 5, 1),
(6, 1, 3),
(7, 2, 2),
(8, 3, 1),
(9, 4, 1),
(10, 5, 1);

-- Insertar datos en la tabla de órdenes
INSERT INTO orders (user_id, total, order_state) VALUES
(1, 999.98, 'En proceso'),
(2, 29.99, 'Completada'),
(3, 89.99, 'Completada'),
(4, 349.99, 'Enviada'),
(5, 599.99, 'Cancelada'),
(6, 1499.97, 'En proceso'),
(7, 59.98, 'Enviada'),
(8, 89.99, 'Cancelada'),
(9, 349.99, 'Completada'),
(10, 599.99, 'En proceso');

-- Insertar datos en la tabla de relación entre órdenes y productos
INSERT INTO order_product (order_id, product_id, quantity) VALUES
(1, 1, 2),
(2, 2, 1),
(3, 3, 1),
(4, 4, 1),
(5, 5, 1),
(6, 1, 3),
(7, 2, 2),
(8, 3, 1),
(9, 4, 1),
(10, 5, 1);

-- Insertar datos en la tabla de favoritos
INSERT INTO favorites (user_id, product_id) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5),
(6, 1),
(7, 2),
(8, 3),
(9, 4),
(10, 5);