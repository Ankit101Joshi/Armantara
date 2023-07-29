import React from "react";
import { BrowserRouter, Routes as AllRoutes, Route } from "react-router-dom";
import Home from "./core/Home";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import AdminRoute from "./auth/helper/AdminRoutes";
import PrivateRoute from "./auth/helper/PrivateRoutes";
import UserDashBoard from "./user/UserDashBoard";
import AdminDashBoard from "./user/AdminDashBoard";
import AddCategory from "./admin/AddCategory";
import ManageCategories from "./admin/ManageCategories";
import AddProduct from "./admin/AddProduct";
import ManageProducts from "./admin/ManageProducts";
import UpdateProduct from "./admin/UpdateProduct";
import Cart from "./core/Cart";
import Contact from "./core/Contact";
import AboutUs from "./core/AboutUs";
import ProductPage from "./core/ProductPage";
import ManageOrders from "./admin/ManageProducts";

const Routes = () => {
  return (
    <BrowserRouter>
      <AllRoutes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/cart" element={<Cart />} />
        <PrivateRoute path="/user/dashboard" element={<UserDashBoard />} />
        <AdminRoute path="/admin/dashboard" element={<AdminDashBoard />} />
        <AdminRoute path="/admin/create/category" element={<AddCategory />} />
        <AdminRoute path="/admin/categories" element={<ManageCategories />} />
        <AdminRoute path="/admin/create/product" element={<AddProduct />} />
        <AdminRoute path="/admin/products" element={<ManageProducts />} />
        <AdminRoute path="/admin/product/update/:productId" element={<UpdateProduct />} />
        <Route path="/admin/orders" exact component={<ManageOrders />} />
        <Route exact path="/product/:productId" element={<ProductPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/aboutus" element={<AboutUs />} />
      </AllRoutes>
    </BrowserRouter>
  );
};

export default Routes;
