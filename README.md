# Equipo 5 Proyecto Final G62

## Hito 3:

### Entrega de backend y documentación

- Considerar el directorio `/backend` para el contenido y la evaluación del entregable.

1. Instalar las dependencias con el comando:

```
cd backend
npm install
```

2. Se debe utilizar la base de datos 'ecommerce'. Si no está creada, las instrucciones son las siguientes:

   2.1 Crear base de datos 'ecommerce' con el siguiente comando:

   ```
   psql -h localhost -U postgres -d ecommerce -f ./config/db.sql
   ```

3. Una vez instaladas las dependencias, creada la base de datos con sus respectivas tablas y configurado el archivo `.env` iniciar el servidor con el comando:

```
npm run dev
```

# EasyCommerce API - Tests de Integración

Este proyecto incluye tests de integración para varios endpoints de la API, los cuales pueden ser ejecutados usando [Jest](https://jestjs.io/) y [Supertest](https://github.com/visionmedia/supertest). A continuación, se describe cómo ejecutar los tests y cómo interactuar con los endpoints probados.

## Configuración

Antes de ejecutar los tests, asegúrate de tener configurado un archivo `.env` con las variables necesarias para conectarte a la base de datos y otros servicios:

```bash
DB_HOST=localhost
DB_USER=postgres
DB_PORT=5432
DB_PASS=postgres
DB_NAME=ecommerce_g5
PORT=3000
JWT_SECRET=$JWT_SECRET
APP_TEST_EMAIL=test@example.com
APP_TEST_PASSWORD=mypassword
```

## Ejecución de los tests

Para ejecutar los tests, utiliza el siguiente comando en la terminal:

```bash
node --experimental-vm-modules node_modules/jest/bin/jest.js
```

## Endpoints Probados

### Carrito

1. **GET /easycommerce/cart/user/:user_id**

   Obtiene el carrito del usuario autenticado.

   **Ejemplo de respuesta exitosa:**

   ```json
   {
     "message": "Carrito del usuario",
     "cart": { ... }
   }
   ```

2. **POST /easycommerce/cart/user/:user_id**

   Agrega productos al carrito del usuario autenticado.

   **Datos requeridos:**

   - `product_id`: ID del producto
   - `quantity`: Cantidad del producto

   **Ejemplo de respuesta exitosa:**

   ```json
   {
     "message": "Producto Añadido Correctamente",
     "cart": { ... }
   }
   ```

3. **DELETE /easycommerce/cart/user/:user_id/product/:product_id**

   Elimina un producto del carrito del usuario autenticado.

   **Ejemplo de respuesta exitosa:**

   ```json
   {
     "message": "Producto eliminado correctamente"
   }
   ```

### Categorías

1. **GET /easycommerce/categories/**

   Obtiene todas las categorías.

   **Ejemplo de respuesta exitosa:**

   ```json
   [
     { "id": 1, "name": "Categoría 1" },
     { "id": 2, "name": "Categoría 2" }
   ]
   ```

2. **GET /easycommerce/categories/:id**

   Obtiene una categoría específica por su ID.

   **Ejemplo de respuesta exitosa:**

   ```json
   {
     "id": 1,
     "name": "Categoría 1"
   }
   ```

3. **POST /easycommerce/categories/**

   Crea una nueva categoría.

   **Datos requeridos:**

   - `name`: Nombre de la categoría

   **Ejemplo de respuesta exitosa:**

   ```json
   {
     "message": "Categoría creada correctamente",
     "create": {
       "id": 3,
       "name": "test"
     }
   }
   ```

4. **DELETE /easycommerce/categories/:id**

   Elimina una categoría existente.

   **Ejemplo de respuesta exitosa:**

   ```json
   {
     "message": "Categoría eliminada correctamente"
   }
   ```

### Favoritos

1. **GET /easycommerce/favorites/**

   Obtiene todos los productos favoritos del usuario autenticado.

   **Ejemplo de respuesta exitosa:**

   ```json
   [
     { "product_id": 1, "name": "Producto 1" },
     { "product_id": 2, "name": "Producto 2" }
   ]
   ```

2. **POST /easycommerce/favorites/user/:user_id**

   Añade un producto a la lista de favoritos del usuario.

   **Datos requeridos:**

   - `product_id`: ID del producto a añadir

   **Ejemplo de respuesta exitosa:**

   ```json
   {
     "message": "Producto añadido a favoritos",
     "favorite": { ... }
   }
   ```

3. **DELETE /easycommerce/favorites/user/:user_id/product/:product_id**

   Elimina un producto de la lista de favoritos del usuario.

   **Ejemplo de respuesta exitosa:**

   ```json
   {
     "message": "Producto eliminado de favoritos"
   }
   ```

### Órdenes

1. **GET /easycommerce/orders/allOrders**

   Obtiene todas las órdenes disponibles.

   **Ejemplo de respuesta exitosa:**

   ```json
   [
     { "order_id": 1, "total": 100 },
     { "order_id": 2, "total": 150 }
   ]
   ```

2. **GET /easycommerce/orders/user/:user_id**

   Obtiene las órdenes del usuario autenticado.

   **Ejemplo de respuesta exitosa:**

   ```json
   [
     { "order_id": 1, "total": 100 },
     { "order_id": 2, "total": 150 }
   ]
   ```

3. **POST /easycommerce/orders/user/:user_id**

   Crea una nueva orden para el usuario.

   **Datos requeridos:**

   - `total`: Total de la orden
   - `order_state`: Estado de la orden
   - `products`: Array de productos con `product_id` y `quantity`

   **Ejemplo de respuesta exitosa:**

   ```json
   {
     "message": "Orden creada correctamente",
     "order_id": 3
   }
   ```

4. **PUT /easycommerce/orders/:order_id**

   Actualiza el estado de una orden existente.

   **Datos requeridos:**

   - `order_state`: Nuevo estado de la orden

   **Ejemplo de respuesta exitosa:**

   ```json
   {
     "message": "Orden actualizada correctamente"
   }
   ```

5. **DELETE /easycommerce/orders/:order_id**

   Elimina una orden existente.

## Limpieza de Datos

Después de ejecutar los tests, puedes utilizar la función de cierre que elimina el token de autenticación y cierra las sesiones:

```javascript
afterAll(async () => {
  await logoutUser(token);
});
```

## Ayuda para la Autenticación

Los tests dependen de la autenticación del usuario. A continuación se describe cómo se realiza la autenticación en los tests:

1. **loginUser**: Se utiliza al inicio de los tests para obtener el token de autenticación y el `user_id`.

   ```javascript
   beforeAll(async () => {
     const loginResponse = await loginUser();
     token = loginResponse.token;
     user_id = loginResponse.user.id;
   });
   ```

2. **logoutUser**: Se llama después de todos los tests para eliminar el token de autenticación y limpiar cualquier sesión.
   ```javascript
   afterAll(async () => {
     await logoutUser(token);
   });
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

  git add - Diseñar las tablas de la base de datos y sus relaciones:

          Se ha adjuntado una imagen con el modelo entidad-relación, en la cual aparecen las tablas con sus nombres, los campos y sus relaciones.

      - Diseñar el contrato de datos de la API REST:

          Se entrega en la presentación los contratos de cada servicio para satisfacer el funcionamiento del ecommerce.

      - Enlace con la presentación <a href="https://docs.google.com/presentation/d/1aNZfxCpolIx6yvn7_lQFB06teZuFhWFhT1Z94-VxL8k/edit?usp=sharing">aquí</a>.

### Martín Gómez - Pablo Ramírez - Ignacio Tapia &copy;
