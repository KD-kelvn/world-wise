import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/FakeAuthContext,";
import styles from "./User.module.css";

const User = () => {
    const { user, handleLogout } = useAuth();
    const navigate = useNavigate();

    function handleClick() {
        handleLogout();
        navigate("/");
    }

    return (
        <div className={styles.user}>
            <img src={user.avatar} alt={user.name} />
            <span>Welcome, {user.name}</span>
            <button onClick={handleClick}>Logout</button>
        </div>
    )
}

export default User