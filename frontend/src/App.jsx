import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import Home from "./components/Home";
import AboutUs from "./components/AboutUs";
import Footer from "./components/Footer";
import Profile from "./pages/User/Profile";
import Favorites from "./pages/Products/Favorites";
import Cart from "./pages/Products/Cart";
import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import AllProducts from "./pages/Products/AllProducts";
import ProductDetail from "./pages/Products/ProductDetail";

//Rutas de administrador
import AllUsers from "./pages/Admin/Users/AllUsers";
import AllOrders from "./pages/Admin/AllOrders";
import CreateProduct from "./pages/Admin/CreateProduct";
import CreateCategory from "./pages/Admin/CreateCategory";

//User
import UserOrder from "./pages/User/UserOrder";
//Contextos
import { UserProvider } from "./context/userContext";
import { ProductProvider } from "./context/productContext";

function App() {
  return (
    <div className="flex flex-col min-h-screen w-full cursor-pointer">
      <UserProvider>
        <ProductProvider>
          <BrowserRouter>
            <Header />
            <Navbar />
            <div className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/products" element={<AllProducts />} />
                <Route path="/aboutUs" element={<AboutUs />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/cart" element={<Cart />} />
                {/* Rutas de Admin */}
                <Route path="/allUsers" element={<AllUsers />} />
                <Route path="/allOrders" element={<AllOrders />} />
                <Route path="/createProduct" element={<CreateProduct />} />
                <Route path="/createCategory" element={<CreateCategory />} />
                {/* Ruta para ver el detalle del producto */}
                <Route path="/product/:id" element={<ProductDetail />} />
                {/* Ordenes de usuario */}
                <Route path="/userOrders" element={<UserOrder />} />
              </Routes>
            </div>
            <Footer />
          </BrowserRouter>
        </ProductProvider>
      </UserProvider>
    </div>
  );
}

export default App;
