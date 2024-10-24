// src/routes/AuthRoutes.js
import React from "react";
import { Route, Routes } from "react-router-dom";
import Register from "../components/auth/register";
import Login from "../components/auth/login";
import VerifyCode from "../components/auth/VerifyCode";
import PasswordResetRequest from "../components/auth/PasswordResetRequest";
import ResetPassword from "../components/auth/ResetPassword";
import NotFound from "../pages/notfound";
const AuthRoutes = () => (

    <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify-code" element={<VerifyCode />} />
        <Route path="/reset-password-request" element={<PasswordResetRequest />} />
        <Route path="/reset-password/reset/:token" element={<ResetPassword />} />
        <Route path="*" element={<NotFound />} />
    </ Routes>

);

export default AuthRoutes;
