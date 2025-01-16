import { createBrowserRouter } from "react-router-dom";
import Auth from "../Authentication/Auth/Auth";
import MainLayout from "../layout/MainLayout";
import AvailableCamps from "../pages/AllCamps/AvailableCamps";
import Details from "../pages/AllCamps/Details";
import AddCamp from "../pages/Dashboard/AddCamp/AddCamp";
import Dashboard from "../pages/Dashboard/Dashboard";
import Home from "../pages/Home";
import Login from "../pages/Login";
import RegisterCamp from "../pages/Participant/RegisterCamp";
import Register from "../pages/Register";
import PaymentHistory from "../components/Payment/PaymentHistory";

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
                path: '/all-camps',
                element: <AvailableCamps></AvailableCamps>
            },
            {
                path: '/camp/:id',
                element: <Details></Details>
            },
            {
                path: '/dashboard',
                element: <Dashboard></Dashboard>,
                children: [
                    {
                        path: '/dashboard/add-camp',
                        element: <AddCamp></AddCamp>
                    },
                    // participant dashboard section 
                    {
                        path: '/dashboard/register-camp',
                        element: <RegisterCamp></RegisterCamp>
                    },
                    {
                        path: '/dashboard/payment-history',
                        element: <PaymentHistory></PaymentHistory>
                    },
                ]
            }
        ]
    },
    {
        path: '/auth',
        element: <Auth></Auth>,
        children: [
            {
                path: '/auth/login',
                element: <Login></Login>
            },
            {
                path: '/auth/register',
                element: <Register></Register>
            }
        ]
    }
])

export default router
