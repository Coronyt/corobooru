import { useAuthContext } from "./useAuthContext";
import { useState } from "react";

export const useBoardRename = () => {
    // Initializing states (err & pending)
    const [error, setError] = useState(null);
    const [pending, setPending] = useState(null);
    // Pulling necessary refs from context provider
    const { user } = useAuthContext();
    // Sending PUT request with fetch()
    const send_board_name = async (header) => {
        console.log(header);
        setPending(true); // Set pending
        setError(null); // Reset errors
        const res = await fetch(`/api/config/booru/${user.username}/set_header`, {
            method: "PUT",
            body: JSON.stringify({header}),
            headers: {
                "Content-Type": "application/json"
            }
        });
        if (!res.ok) {
            setPending(false);
            setError(res.error); // ?
        }
        if (res.ok) {
            setPending(true);
        }
    }
    return {send_board_name, error, pending}
}