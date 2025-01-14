import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Auth from "../Authentication/Auth/Auth";
import Dashboard from "../pages/Dashboard/Dashboard";
import AddCamp from "../pages/Dashboard/AddCamp/AddCamp";

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout></MainLayout>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/dashboard',
                element: <Dashboard></Dashboard>,
                children: [
                    {
                        path: '/dashboard/add-camp',
                        element: <AddCamp></AddCamp>
                    }
                ]
            }
        ]
    },
    {
        path: '/auth',
        element: <Auth></Auth>,
        children: [
            {
                path:'/auth/login',
                element:<Login></Login>
            },
            {
                path:'/auth/register',
                element: <Register></Register>
            }
        ]
    }
])

export default router
