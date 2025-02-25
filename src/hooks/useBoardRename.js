import { useAuthContext } from "./useAuthContext";
import { useState } from "react";

export const useBoardRename = () => {
    // Initializing states (err & pending)
    const [error, setError] = useState(null);
    const [pending, setPending] = useState(null);
    // Pulling necessary refs from context provider
    const { user } = useAuthContext();
    // Sending PUT request with fetch()
    const send_board_name = async (name) => {
        // TODO
    }
    return {send_board_name, error, pending}
}