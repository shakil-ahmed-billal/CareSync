import { createBrowserRouter } from "react-router-dom";
import Auth from "../Authentication/Auth/Auth";
import PaymentHistory from "../components/Payment/PaymentHistory";
import ErrorPage from "../error/ErrorPage";
import MainLayout from "../layout/MainLayout";
import AddCamp from "../pages/Admin/AddCamp/AddCamp";
import ManageCamp from "../pages/Admin/ManageCamp/ManageCamp";
import ManageRegister from "../pages/Admin/ManageRegister/ManageRegister";
import OrganizerProfile from "../pages/Admin/Profile/OrganizerProfile";
import UpdateCamp from "../pages/Admin/UpdateCamp/UpdateCamp";
import AvailableCamps from "../pages/AllCamps/AvailableCamps";
import Details from "../pages/AllCamps/Details";
import Dashboard from "../pages/Dashboard/Dashboard";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import RegisterCamp from "../pages/user/Participant/RegisterCamp";
import ParticipantProfile from "../pages/user/Profile/ParticipantProfile";
import UserAnalytics from "../pages/user/userAnalytics/UserAnalytics";
import AdminRoute from "../private/AdminRoute";
import PrivateRoute from "../private/PrivateRoute";

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
                element: <AvailableCamps></AvailableCamps>,
                loader: () => fetch(`${import.meta.env.VITE_SERVER_URL}/camp-count`)
            },
            {
                path: '/camp/:id',
                element: <Details></Details>
            },
            {
                path: '/dashboard',
                element: <Dashboard></Dashboard>,
                children: [
                    // Organizer dashboard section
                    {
                        path: '/dashboard/add-camp',
                        element: <AdminRoute><AddCamp></AddCamp></AdminRoute>
                    },
                    {
                        path: '/dashboard/organizerProfile',
                        element: <AdminRoute><OrganizerProfile></OrganizerProfile></AdminRoute>
                    },
                    {
                        path: '/dashboard/manage-camp',
                        element: <AdminRoute><ManageCamp></ManageCamp></AdminRoute>,
                        loader: () => fetch(`${import.meta.env.VITE_SERVER_URL}/camp-count`)
                    },
                    {
                        path: '/dashboard/manage-registered',
                        element: <AdminRoute><ManageRegister></ManageRegister></AdminRoute>
                    },
                    {
                        path: '/dashboard/updateCamp/:id',
                        element: <AdminRoute><UpdateCamp></UpdateCamp></AdminRoute>
                    },
                    // participant dashboard section 
                    {
                        path: '/dashboard/register-camp',
                        element: <PrivateRoute><RegisterCamp></RegisterCamp></PrivateRoute>
                    },
                    {
                        path: '/dashboard/payment-history',
                        element: <PrivateRoute><PaymentHistory></PaymentHistory></PrivateRoute>
                    },
                    {
                        path: '/dashboard/participant-profile',
                        element: <PrivateRoute><ParticipantProfile></ParticipantProfile></PrivateRoute>
                    },
                    {
                        path: '/dashboard/analytics',
                        element: <PrivateRoute><UserAnalytics></UserAnalytics></PrivateRoute>
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
    },
    {
        path: '*',
        element: <ErrorPage></ErrorPage>
    }
])

export default router
