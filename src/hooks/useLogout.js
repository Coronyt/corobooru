// Hooking into app auth context so we can manipulate session auth data within this hook
import { useAuthContext } from "../hooks/useAuthContext";

export const useLogout = () => {
    const { dispatch } = useAuthContext();
    const logout = () => {
        // Deleting obj named "user" from local storage
        localStorage.removeItem("user");
        // Dispatching state changes for user logout
        dispatch({type: "LOGOUT_USER"});
    } // Return logout funcref in obj
    return {logout}
}