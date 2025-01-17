import { Navigate, useLocation } from "react-router-dom"
import Loading from "../components/Loading/Loading"
import useAuth from "../hooks/useAuth"


const PrivateRoute = ({ children }) => {

    const { user, loading } = useAuth()
    const location = useLocation()

    if (loading) {
        return <Loading></Loading>
    }
    if (user) {
        return children
    }

    return <Navigate to={'/auth/login'} state={location?.pathname}></Navigate>
}

export default PrivateRoute
