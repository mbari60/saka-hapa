// import logo from './logo.svg';
// import './App.css';
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar";
import Feedback from "./pages/feedback";
import Profile from "./pages/profile";
import Offers from "./pages/offers";
import Home from "./pages/home";
import Products from "./pages/products";
import Cart from "./pages/cart";
import { useState } from "react";
import Contact from "./pages/contact";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Notifications from "./pages/notifications";
import AdminPage from "./admin/viewpage";
import AdminProducts from "./admin/adminproducts";
import AdminOffers from "./admin/adminoffers";
import AdminNotifications from "./admin/adminnotifications";

function App() {
  // Define state for cart and function to set cart
  const [cart, setCart] = useState([]);

  // Function to add product to cart
  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  // Function to remove product from cart
  const removeFromCart = (productToRemove) => {
    setCart(cart.filter((product) => product.id !== productToRemove.id));
  };

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/home" element={<Home />} />
        <Route path="/offers" element={<Offers />} />
        <Route path="/products" element={<Products addToCart={addToCart} />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route
          path="/cart"
          element={<Cart cart={cart} removeFromCart={removeFromCart} />}
        />
        <Route path="/profile" element={<Profile />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="/adminviews" element={<AdminPage />} />
        <Route path="/adminproducts" element={<AdminProducts />} />
        <Route path="/adminoffers" element={<AdminOffers />} />
        <Route path="/adminnotifications" element={<AdminNotifications />} />
      </Routes>
    </div>
  );
}

export default App;
