import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { pool, setupDatabase } from "./config/db.js";
import path from "path";
import { fileURLToPath } from "url";
//Rutas de usuario
import productRoutes from "./routes/product.routes.js";
import categoryRoutes from "./routes/category.routes.js";
import userRoutes from "./routes/user.routes.js";
import cartRoutes from "./routes/carts.routes.js";
import favoritesRoutes from "./routes/favorites.routes.js";
import orderRoutes from "./routes/order.routes.js";

//Comprobar que la conexion a la base de datos es exitosa
dotenv.config();
pool;

//Servidor
const app = express();
const PORT = process.env.PORT;

//Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
); //Configurar despues

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//Configuración para servir archivos estáticos
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

//Rutas de los productos
app.use("/easycommerce/products", productRoutes);
//Rutas de las categorias
app.use("/easycommerce/categories", categoryRoutes);
//Rutas de los usuarios
app.use("/easycommerce/users", userRoutes);
//Rutas de los carritos
app.use("/easycommerce/cart", cartRoutes);
//Rutas de los productos favoritos
app.use("/easycommerce/favorites", favoritesRoutes);
//Rutas de las ordenes
app.use("/easycommerce/orders", orderRoutes);

// Iniciar el servidor
const startServer = async () => {
  try {
    // Realizar el setup de la base de datos
    await setupDatabase();

    // Iniciar el servidor en el puerto definido
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Error al iniciar el servidor:", error.message);
    process.exit(1);
  }
};

startServer();

export default app;
