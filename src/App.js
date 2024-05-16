// import logo from './logo.svg';
// import './App.css';
import { useState, useContext } from "react";
import { Route, Routes} from "react-router-dom";
import Navbar from "./components/navbar";
import Feedback from "./pages/feedback";
import Offers from "./pages/offers";
import Home from "./pages/home";
import Products from "./pages/products";
import Cart from "./pages/cart";
import Contact from "./pages/contact";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Notifications from "./pages/notifications";
import AdminPage from "./admin/viewpage";
import AdminProducts from "./admin/adminproducts";
import AdminOffers from "./admin/adminoffers";
import AdminNotifications from "./admin/adminnotifications";
import AdminUsers from "./admin/adminusers";
import OrderList from "./admin/orders";
import UserProfile from "./pages/userprofile";
import AboutUs from "./pages/about";
import Footer from "./components/footer";
import "./index.css";
import { AuthContext } from "./context/authcontext";

function App() {
  const { isAuthenticated, user } = useContext(AuthContext);
  const isSuperuser = isAuthenticated && user && user.role === "admin";

  //assigning admin his routes alone



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
    <div className="App">
      <Navbar />
      <div className="MainContent">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
          <Route path="/offers" element={<Offers />} />
          <Route
            path="/products"
            element={<Products addToCart={addToCart} />}
          />
          <Route path="/notifications" element={<Notifications />} />
          <Route
            path="/cart"
            element={<Cart cart={cart} removeFromCart={removeFromCart} />}
          />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/about-us" element={<AboutUs/>}/>
          <Route path="/contact" element={<Contact />} />
          {isSuperuser && (
            <>
              <Route path="/adminviews" element={<AdminPage />} />
              <Route path="/adminproducts" element={<AdminProducts />} />
              <Route path="/adminoffers" element={<AdminOffers />} />
              <Route
                path="/adminnotifications"
                element={<AdminNotifications />}
              />
              <Route path="/adminusers" element={<AdminUsers />} />
              <Route path="/getorders" element={<OrderList />} />
            </>
          )}
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
