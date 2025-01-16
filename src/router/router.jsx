import { createBrowserRouter } from "react-router-dom";
import Auth from "../Authentication/Auth/Auth";
import MainLayout from "../layout/MainLayout";
import AvailableCamps from "../pages/AllCamps/AvailableCamps";
import Details from "../pages/AllCamps/Details";

import Dashboard from "../pages/Dashboard/Dashboard";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PaymentHistory from "../components/Payment/PaymentHistory";
import AddCamp from "../pages/Admin/AddCamp/AddCamp";
import RegisterCamp from "../pages/user/Participant/RegisterCamp";
import OrganizerProfile from "../pages/Admin/Profile/OrganizerProfile";
import ManageCamp from "../pages/Admin/ManageCamp/ManageCamp";
import ManageRegister from "../pages/Admin/ManageRegister/ManageRegister";

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
                    // Organizer dashboard section
                    {
                        path: '/dashboard/organizerProfile',
                        element: <OrganizerProfile></OrganizerProfile>
                    },
                    {
                        path: '/dashboard/manage-camp',
                        element: <ManageCamp></ManageCamp>
                    },
                    {
                        path: '/dashboard/manage-registered',
                        element: <ManageRegister></ManageRegister>
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
