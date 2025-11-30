import { createBrowserRouter, Navigate } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import { AnonymousRoute } from "./AnonymousRoute";
import Home from "@pages/Home";
import Login from "@pages/Login";
import Register from "@pages/Register";
import Menu from "@pages/Menu";
import Order from "@pages/Order";
import OrderStatus from "@pages/OrderStatus";
import Profile from "@pages/Profile";
import App from "../App";

export const router = createBrowserRouter([
    {
        element: <App />, // App will now be the Layout wrapper
        children: [
            // Public Routes
            {
                index: true,
                element: <Home />,
            },
            {
                path: "menu",
                element: <Menu />,
            },

            // Auth Routes (Anonymous only)
            {
                element: <AnonymousRoute />,
                children: [
                    { path: "login", element: <Login /> },
                    { path: "register", element: <Register /> },
                ],
            },

            // Protected Routes
            {
                element: <ProtectedRoute />,
                children: [
                    { path: "profile", element: <Profile /> },
                    { path: "order", element: <Order /> },
                    { path: "order-status/:orderId", element: <OrderStatus /> },
                ],
            },

            // 404
            { path: "*", element: <Navigate to="/" replace /> },
        ],
    },
]);