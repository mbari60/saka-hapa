import React from "react";
import { Link } from "react-router-dom";
import Rating from "../components/Rating";

const Home = () => {
      const ratings = [
        { user: "User1", stars: 5, comment: "Great product!" },
        { user: "User2", stars: 4, comment: "Love it!" },
        { user: "User3", stars: 5, comment: "Highly recommend!" },
      ];
  return (
    <div
      style={{
        backgroundImage: `https://media.istockphoto.com/id/1467976868/photo/the-convenience-of-shopping-online.webp?b=1&s=170667a&w=0&k=20&c=lAmij1MEFu7mxaexsA_Sa3EkkOjY5MBE4zFhmJd_JcA=`,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: "20px",
      }}
    >
      <h1 style={{ color: "#fff", fontSize: "3rem", marginBottom: "20px" }}>
        Welcome to Our E-Commerce Platform
      </h1>
      <p style={{ color: "#fff", fontSize: "1.5rem", marginBottom: "30px" }}>
        Shop the best products with ease and convenience
      </p>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "30px",
        }}
      >
        <div style={{ marginRight: "20px" }}>
          <img
            src="https://media.istockphoto.com/id/1467976868/photo/the-convenience-of-shopping-online.webp?b=1&s=170667a&w=0&k=20&c=lAmij1MEFu7mxaexsA_Sa3EkkOjY5MBE4zFhmJd_JcA="
            alt="Product 1"
            style={{ width: "200px", height: "200px", borderRadius: "10px" }}
          />
          <p>Product 1 Description</p>
        </div>
        <div style={{ marginRight: "20px" }}>
          <img
            src="https://media.istockphoto.com/id/1467976868/photo/the-convenience-of-shopping-online.webp?b=1&s=170667a&w=0&k=20&c=lAmij1MEFu7mxaexsA_Sa3EkkOjY5MBE4zFhmJd_JcA="
            alt="Product 2"
            style={{ width: "200px", height: "200px", borderRadius: "10px" }}
          />
          <p>Product 2 Description</p>
        </div>
        <div>
          <img
            src="https://media.istockphoto.com/id/1467976868/photo/the-convenience-of-shopping-online.webp?b=1&s=170667a&w=0&k=20&c=lAmij1MEFu7mxaexsA_Sa3EkkOjY5MBE4zFhmJd_JcA="
            alt="Product 3"
            style={{ width: "200px", height: "200px", borderRadius: "10px" }}
          />
          <p>Product 3 Description</p>
        </div>
      </div>

      <div style={{ marginBottom: "30px" }}>
        <img
          src="https://media.istockphoto.com/id/1467976868/photo/the-convenience-of-shopping-online.webp?b=1&s=170667a&w=0&k=20&c=lAmij1MEFu7mxaexsA_Sa3EkkOjY5MBE4zFhmJd_JcA="
          alt="Delivery"
          style={{ width: "300px", height: "200px", marginBottom: "20px" }}
        />
        <p style={{ color: "#fff", fontSize: "1.5rem" }}>
          Fast and Reliable Delivery
        </p>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "30px",
        }}
      >
        <div style={{ marginRight: "20px" }}>
          <h2 style={{ color: "#fff", fontSize: "2rem" }}>Great Products</h2>
          <p style={{ color: "#fff", fontSize: "1.2rem" }}>
            Find a wide range of high-quality products
          </p>
        </div>
        <div style={{ marginRight: "20px" }}>
          <h2 style={{ color: "#fff", fontSize: "2rem" }}>Secure Payment</h2>
          <p style={{ color: "#fff", fontSize: "1.2rem" }}>
            Shop with confidence using our secure payment methods
          </p>
        </div>
        <div>
          <h2 style={{ color: "#fff", fontSize: "2rem" }}>
            24/7 Customer Support
          </h2>
          <p style={{ color: "#fff", fontSize: "1.2rem" }}>
            Get help whenever you need it with our dedicated support team
          </p>
        </div>
      </div>

      <div>
        <h2 style={{ color: "#fff", fontSize: "2rem", marginBottom: "20px" }}>
          Customer Reviews
        </h2>
        <p style={{ color: "#fff", fontSize: "1.2rem" }}>
          Read what our satisfied customers have to say
        </p>
      </div>
      <Rating ratings={ratings} />
      <Link
        to="/products"
        style={{ textDecoration: "none", marginTop: "30px" }}
      >
        <button
          style={{
            padding: "10px 20px",
            fontSize: "1.2rem",
            backgroundColor: "#4CAF50",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Shop Now
        </button>
      </Link>
    </div>
  );
};

export default Home;
