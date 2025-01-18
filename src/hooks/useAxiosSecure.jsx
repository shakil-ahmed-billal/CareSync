import axios from "axios";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL,
    withCredentials: true,
});

const useAxiosSecure = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { userLogOut } = useAuth();

    useEffect(() => {
        const interceptor = axiosSecure.interceptors.response.use(
            (response) => response, // Return response directly for success
            async (error) => {
                // Handle error
                if (error.response?.status === 401) {
                    await userLogOut();
                    navigate('/auth/login', { state: { from: location.pathname }, replace: true });
                }
                return Promise.reject(error); // Reject other errors
            }
        );

        // Cleanup function
        return () => {
            axiosSecure.interceptors.response.eject(interceptor);
        };
    }, [navigate, location, userLogOut]);

    return axiosSecure;
};

export default useAxiosSecure;

