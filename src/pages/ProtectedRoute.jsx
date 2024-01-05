import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/FakeAuthContext,"
import { useEffect } from "react";


const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useAuth()
    const navigate = useNavigate();

    useEffect(function () {
        if (!isAuthenticated) {
            navigate("/login")
        }
    }, [isAuthenticated, navigate])
    return isAuthenticated ? children : null;
}

export default ProtectedRoute