import { useAuthContext } from "../hooks/useAuthContext";
import { useState } from "react";

export const useLogin = () => {
    // Initializing states (err & pending)
    const [error, setError] = useState(null);
    const [pending, setPending] = useState(null);
    // Pulling necessary refs from context provider
    const { dispatch } = useAuthContext();
    // Sending POST request with fetch()
    const login = async (username, password) => {
        setPending(true); // Set pending
        setError(null); // Reset errors
        const res = await fetch("/api/login", { // TODO - Currently fetching at proxy address, for production will need to store in .env variables
            method: "POST",
            body: JSON.stringify({username, password}),
            headers: {
                "Content-Type": "application/json"
            }
        });
        const json = await res.json();
        if (!res.ok) {
            setPending(false);
            setError(json.error);
        }
        if (res.ok) {
            // Saving user token to local appdata
            localStorage.setItem("user", JSON.stringify(json));
            // Updating auth context with user data
            dispatch({type: "LOGIN_USER", payload: json});
            setPending(false); // Login successful
        }
    } // Return login funcref and local state refs
    return {login, error, pending}
}