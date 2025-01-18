import { Navigate, useLocation } from "react-router-dom"
import Loading from "../components/Loading/Loading"
import useAdmin from "../hooks/useAdmin"
import useAuth from "../hooks/useAuth"

const AdminRoute = ({ children }) => {
    const { user, loading } = useAuth()
    const [admin, isPending] = useAdmin()
    const location = useLocation()

    if (loading || isPending) {
        return <Loading></Loading>
    }
    if (user && admin) {
        return children
    }
    return <Navigate to={'/'} state={location.pathname}></Navigate>
}

export default AdminRoute
