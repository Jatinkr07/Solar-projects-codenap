/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import ContactPage from "./pages/ContactPage";
import ServicePage from "./pages/ServicePage";
import AboutPage from "./pages/AboutPage";
import SingleServicePage from "./pages/SingleServicePage";
import { ToastContainer } from "react-toastify";
import GalleryPage from "./pages/GalleryPage";
import AdminLoginPage from "./pages/Admin/AdminLoginPage";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminLogout from "./pages/Admin/SidebarItem/AdminLogout";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import RequestQuotePage from "./pages/RequestQuotePage";
import ProtectedRoute from "./router/ProtectedRoute.jsx";
import HomePage from "./components/Home/HomePage.jsx";
import ScrollTop from "./hooks/ScrollTop.js";
import "./i18n/index.js";

const MainLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div>{children}</div>
      <Footer />
    </>
  );
};

const App = () => {
  ScrollTop();
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route
          path="/"
          element={
            <MainLayout>
              <HomePage />
            </MainLayout>
          }
        />

        <Route
          path="/about-us"
          element={
            <MainLayout>
              <AboutPage />
            </MainLayout>
          }
        />
        <Route
          path="/products"
          element={
            <MainLayout>
              <ProductsPage />
            </MainLayout>
          }
        />
        <Route
          path="/products/:id"
          element={
            <MainLayout>
              <ProductDetailsPage />
            </MainLayout>
          }
        />
        <Route
          path="/contact-us"
          element={
            <MainLayout>
              <ContactPage />
            </MainLayout>
          }
        />
        <Route
          path="/services"
          element={
            <MainLayout>
              <ServicePage />
            </MainLayout>
          }
        />
        <Route
          path="/services/:id"
          element={
            <MainLayout>
              <SingleServicePage />
            </MainLayout>
          }
        />
        <Route
          path="/gallery"
          element={
            <MainLayout>
              <GalleryPage />
            </MainLayout>
          }
        />
        <Route
          path="/request-quote/:id"
          element={
            <MainLayout>
              <RequestQuotePage />
            </MainLayout>
          }
        />

        <Route path="/admin-login" element={<AdminLoginPage />} />
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/admin/logout" element={<AdminLogout />} />
      </Routes>
    </>
  );
};

export default App;
