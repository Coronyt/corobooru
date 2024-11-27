import { useAuthContext } from "../hooks/useAuthContext";
import { useState } from "react";

export const useSignup = () => {
    // Initializing states (err & pending)
    const [error, setError] = useState(null);
    const [pending, setPending] = useState(null);
    // Pulling necessary refs from context provider
    const { dispatch } = useAuthContext();
    // Sending POST request with fetch()
    const signup = async (email, username, password) => {
        setPending(true); // Set pending
        setError(null); // Reset errors
        const res = await fetch("/api/signup", { // TODO - Currently fetching at proxy address, for production will need to store in .env variables
            method: "POST",
            body: JSON.stringify({email, username, password}),
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
            setPending(false); // Signup successful
        }
    } // Return signup funcref and local state refs
    return {signup, error, pending}
}