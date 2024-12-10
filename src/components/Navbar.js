import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";

const Navbar = () => {

    // Hooking into logout logic via funcref
    const { user } = useAuthContext();
    const { logout } = useLogout();

    const on_click = (e) => {
        logout();
    }

    return (
        <header>
            <div className="navbar">
                <Link to="/" className="title">
                    <h1>corobooru{user && `/${user.username}`}</h1>
                </Link>
                {user && (
                    <div className="logged-in">
                        <span className="material-symbols-outlined" onClick={on_click}>
                            logout
                        </span>
                    </div>
                )}
                {!user && (
                    <nav className="logged-out">
                        <Link to="/login">
                            <h3>Log in</h3>
                        </Link>
                        <Link to="/signup">
                            <h3>Sign up</h3>
                        </Link>
                    </nav>
                )}
            </div>
        </header>
    );
}
 
export default Navbar;