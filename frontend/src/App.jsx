import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import Home from "./components/Home";
import Products from "./pages/Products/Products";
import Blog from "./components/AboutUs";
import Footer from "./components/Footer";
import Profile from "./pages/User/Profile";
import Favorites from "./pages/Products/Favorites";
import Cart from "./pages/Products/Cart";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AllProducts from "./pages/Products/AllProducts";
import ProductDetail from "./pages/Products/ProductDetail";
//ADMIN
import AllUsers from "./pages/Admin/AllUsers";
import AllOrders from "./pages/Admin/AllOrders";
import CreateProduct from "./pages/Admin/CreateProduct";
import CreateCategory from "./pages/Admin/CreateCategory";

function App() {
  return (
    <div className="flex flex-col min-h-screen w-full cursor-pointer">
      <BrowserRouter>
        <Header />
        <Navbar />
        <div className="flex-grow">
          <Routes>
            {/* RUTAS PRINCIPALES */}
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/products" element={<AllProducts />} />
            <Route path="/aboutUs" element={<Blog />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/cart" element={<Cart />} />
            {/* RUTAS DE ADMIN NAVBAR */}
            <Route path="/allUsers" element={<AllUsers />} />
            <Route path="/allOrders" element={<AllOrders />} />
            <Route path="/createProduct" element={<CreateProduct />} />
            <Route path="/createCategory" element={<CreateCategory />} />
            {/* Detalle del producto */}
            <Route path="/product/:id" element={<ProductDetail />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}
export default App;
