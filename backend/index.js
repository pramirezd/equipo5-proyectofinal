import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import pool from "./config/db.js";
import path from 'path'
import { fileURLToPath } from 'url'; 
//Rutas de usuario
import productRoutes from './routes/product.routes.js'
import categoryRoutes from './routes/category.routes.js'
import userRoutes from './routes/user.routes.js'
import cartRoutes from './routes/carts.routes.js'
//Comprobar que la conexion a la base de datos es exitosa
dotenv.config();
pool

//Servidor
const app = express();
const port = process.env.PORT;

//Middlewares
app.use(express.json());
app.use(cookieParser())
app.use(cors({
    origin:'http://localhost:5174',
    credentials: true
})) //Configurar despues


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//Configuración para servir archivos estáticos
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

//Rutas de los productos
app.use("/easycommerce/products", productRoutes)
//Rutas de las categorias
app.use("/easycommerce/categories", categoryRoutes)
//Rutas de los usuarios
app.use("/easycommerce/users", userRoutes)
//Rutas de los carritos
app.use("/easycommerce/cart", cartRoutes)


//Iniciar servidor
app.listen(port, ()=>{
    console.log(`Servidor escuchando en el puerto ${port}`)
});
