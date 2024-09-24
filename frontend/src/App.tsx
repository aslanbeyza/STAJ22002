import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import About from "./pages/About";
import OldOrders from "./pages/OldOrders";
import Sss from "./pages/Sss";
import Contact from "./pages/Contact";
import ProductList from "./pages/ProductList";
import Cart from "./pages/Cart";
import Payment from "./pages/Payment";
import Page404 from "./pages/Page404";
import Homepage from "./pages/Homepage";
import Account from "./pages/Account";
import ProductDetail from './pages/ProductDetail';
import MainLayout from "./pages/Layout/MainLayout";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route element={<MainLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Navigate to="/login" />} />
          <Route index element={<Navigate to="/home" />} />
          <Route path="home" element={<Homepage />} />
          <Route path="oldorders" element={<OldOrders />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="cart" element={<Cart />} />
          <Route path="account" element={<Account />} />
          <Route path="sss" element={<Sss />} />
          <Route path="/product" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/payment" element={<Payment />} />        
          <Route path="/404" element={<Page404 />} />
        </Route>

        {/* Redirect to 404 for undefined routes */}
        <Route path="/*" element={<Navigate to="/404" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
