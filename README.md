# Equipo 5 Proyecto Final G62

## Hito 3:
### Entrega de backend y documentación

- Considerar el directorio `/backend` para el contenido y la evaluación del entregable.

- Instalar las dependencias con el comando:
```
npm install
```

- Se debe utilizar la base de datos 'ecommerce'. Si no está creada, las instrucciones son las siguientes:

    - Crear base de datos 'ecommerce' con el siguiente comando:  
    ```sql 
    CREATE DATABASE ecommerce; 
    ```

    - Crear las siguientes tablas para el funcionamiento correcto del backend:
    ```sql
    -- Crear tabla de usuarios
    CREATE TABLE users (
        id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        name TEXT NOT NULL,
        lastname TEXT NOT NULL,
        address TEXT,
        phone TEXT,
        email TEXT UNIQUE NOT NULL,
        password TEXT UNIQUE NOT NULL,
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
    CREATE TABLE carts (
        id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        user_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    -- Crear tabla de productos en el carrito
    CREATE TABLE cart_product (
        id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        cart_id BIGINT REFERENCES carts(id) ON DELETE CASCADE,
        product_id BIGINT REFERENCES products(id) ON DELETE CASCADE,
        quantity INTEGER NOT NULL
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
        product_id BIGINT REFERENCES products(id) ON DELETE CASCADE
    );
    ```

- Renombrar archivo `.env.example` a `.env` y actualizar con los datos correspondientes, donde:
```js
DB_HOST=host, debería ser localhost
DB_USER=usuario de la base de datos
DB_PORT=puerto de la base de datos (ej. 5432)
DB_PASS=contraseña del usuario de la base de datos
DB_NAME=ecommerce
PORT=puerto del backend, 3000
JWT_SECRET=$JWT_SECRET
```

- Una vez instaladas las dependencias, creada la base de datos con sus respectivas tablas y configurado el archivo `.env` iniciar el servidor con el comando:
```
npm run dev
```

- Se entrega listado de servicios y sus rutas respectivas:

    `Registro de un usuario:`
    ```
    http://localhost:3000/easycommerce/users/register
    ```
    ```js
    Método POST
    ```
    Body
    ```json
    {
        "name": "string",
        "lastname": "string",
        "address": "string",
        "phone": "string",
        "email": "string",
        "password": "string"
    }    
    ```

    `Login de usuario`
    ```
    http://localhost:3000/easycommerce/users/login
    ```
    ```js
    Método POST
    ```
    Body
    ```json
    {
        "email": "string",
        "password": "string"
    }    
    ```

    ``Logout de usuario``
    ```
    http://localhost:3000/easycommerce/users/logout
    ```
    ```js
    Método POST
    ```

    ``Sesión de usuario:``
    ```
    http://localhost:3000/easycommerce/users/myProfile
    ```
    ```js
    Método GET
    ```

    `Ver todos los usuarios registrados`
    ```
    http://localhost:3000/easycommerce/users
    ```
    ```js
    Método GET
    Requiere isAdmin=true
    ```

    `Eliminar un usuario`
    ```
    http://localhost:3000/easycommerce/users/:id
    ```
    ```js
    Método DELETE
    Requiere isAdmin=true
    ```

    ``Productos:``
    ```
    http://localhost:3000/easycommerce/products
    ```
    ```js
    Método GET
    ```

    `Crear un producto`
    ```
    http://localhost:3000/easycommerce/products
    ```
    ```js
    Método POST
    Requiere isAdmin=true
    ```
    Body:

    ```json
    {
        "name": "string",
        "description": "string",
        "price": number,
        "stock": int,
        "brand": "string",
        "category_id": int (opcional)
    }
    ```

    `Obtener producto`
    ```
    http://localhost:3000/easycommerce/products/product/:product_id
    ```
    ```js
    Método GET
    Requiere isAdmin=true
    ```

    `Eliminar un producto`
    ```
    http://localhost:3000/easycommerce/products/:product_id
    ```
    ```js
    Método DELETE
    Requiere isAdmin=true
    ```

    ``Obtener Categorías:``
    ```
    http://localhost:3000/easycommerce/categories
    ```
    ```js
    Método GET
    ```

    ``Crear Categorías:``
    ```
    http://localhost:3000/easycommerce/categories
    ```
    ```js
    Método POST
    Requiere isAdmin=true
    ```
    Body:

    ```json
    {
        "name": "string"
    }
    ```

    ``Carrito del usuario``
    ```
    http://localhost:3000/easycommerce/cart
    ```
    ```js
    Método GET
    ```

    ``Agregar al carrito:``
    ```
    http://localhost:3000/easycommerce/cart/add
    ```
    ```js
    Método POST
    ```
    
    Body:

    ```json
    {
        "product_id": int ,
        "quantity": int
    }
    ```

    ``Quitar del carrito:``
    ```
    http://localhost:3000/easycommerce/cart/remove/:cartProductId
    ```
    ```js
    Método DELETE
    ```

    ``Mis favoritos:``
    ```
    http://localhost:3000/easycommerce/favorites/user/:user_id
    ```
    ```js
    Método GET
    ```

    ``Agregar a favoritos``
    ```
    http://localhost:3000/easycommerce/favorites/user/:user_id
    ```
    ```js
    Método POST
    ```
    Body:

    ```json
    {
        "product_id": int
    }
    ```

    ``Quitar de favoritos``
    ```
    http://localhost:3000/easycommerce/favorites/user/:user_id/product/:product_id
    ```
    ```js
    Método DELETE
    ```

    `Obtener todas las órdenes`
    ```
    http://localhost:3000/easycommerce/orders/allOrders
    ```
    ```js
    Método GET
    ```

    `Obtener órdenes del usuario`
    ```
    http://localhost:3000/easycommerce/orders/user/:user_id
    ```
    ```js
    Método GET
    ```

    `Crear una orden a un usuario`
    ```
    http://localhost:3000/easycommerce/orders/user/:user_id
    ```
    ```js
    Método POST
    ```
    Body:

    ```json
    {
        "total": int,
        "order_state": "string"
    }
    ```
    
    `Modificar una orden de un usuario`
    ```
    http://localhost:3000/easycommerce/orders/:id/user/:user_id
    ```
    ```js
    Método PUT
    ```
    Body:

    ```json
    {
        "total": int,
        "order_state": "string"
    }
    ```

    `Eliminar una orden de un usuario`
    ```
    http://localhost:3000/easycommerce/orders/:id/user/:user_id
    ```
    ```js
    Método DELETE
    ```

- Para probar los servicios que requieren permisos de administrador, se recomienda usar el API de registro de usuario documentada y utilizando el `id` de usuario que responde el servicio de registro, utilizar el siguiente script SQL:
```sql
UPDATE users SET isAdmin = true WHERE id = "id del usuario registrado"
```

- Adicionalmente, para los test, considerando que en el proyecto se decidió usar el formato de ECMAScript usando `import`, Jest no es compatible de forma nativa con ECMAScript, sino que con CommonJS, por lo que se optó por seguir la documentación de Jest para habilitar el modo experimental y poder ejecutar los test respectivos. Por lo tanto, para ejecutar los test, se debe utilizar el siguiente comando:

```bash
node --experimental-vm-modules node_modules/jest/bin/jest.js
```

    
### Hitos Anteriores
#### Hito 2:
- Se disponibiliza la rama main para contar con el entregable del hito 2, correspondiente al front.

- Considerar la carpeta `/frontend` para el contenido y la evaluación del entregable

- Dentro de la carpeta `/frontend`, utilizar el comando `npm install` para instalar las dependencias y `npm run dev` para ejecutar el proyecto.

#### Hito 1:
- Se ha disponibilizado una presentación que contiene los 5 puntos solicitados.

- Estos puntos son:

    - Diseñar un boceto de las vistas del proyecto:
    Se deben considerar por lo menos las siguientes pantallas o componentes:
    
        - Página principal
        - Registro de usuarios
        - Inicio de sesión
        - Mi perfil
        - Formulario para crear una publicación
        - Galería de publicaciones
        - Vista de detalle de una publicación

        La presentación contiene las distintas vistas indicando específicamente como estarán construidos los sitios que pueden ser navegados por los usuarios y también según el permiso que tengan dentro del sitio de acuerdo a su perfil.

    - Definir la navegación entre vistas marcando las públicas y las privadas.

        Se construyó un mapa de navegación diferenciando las vistas públicas y privadas.

    - Enlistar las dependencias a utilizar en el proyecto:

        Se indican las dependencias a utilzar, tanto para frontend como para backend dentro del proyecyo.
git add
    - Diseñar las tablas de la base de datos y sus relaciones:

        Se ha adjuntado una imagen con el modelo entidad-relación, en la cual aparecen las tablas con sus nombres, los campos y sus relaciones.

    - Diseñar el contrato de datos de la API REST:

        Se entrega en la presentación los contratos de cada servicio para satisfacer el funcionamiento del ecommerce.

    - Enlace con la presentación <a href="https://docs.google.com/presentation/d/1aNZfxCpolIx6yvn7_lQFB06teZuFhWFhT1Z94-VxL8k/edit?usp=sharing">aquí</a>.

### Martín Gómez - Pablo Ramírez - Ignacio Tapia &copy;