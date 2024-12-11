import { useAuthContext } from "../hooks/useAuthContext";
import { useState } from "react";

export const useImageUpload = () => {
    // Initializing states (err & pending)
    const [error, setError] = useState(null);
    const [pending, setPending] = useState(null);
    // Pulling necessary refs from context provider
    const { user } = useAuthContext();
    // TODO - May tweak the below code in the future to handle uploads of multiple files at once
    const image_upload = async (file, tags) => {
        setPending(true); // Set pending
        setError(null); // Reset errors
        const data = new FormData();
        data.append('file', file);
        data.append('tags', tags); // Tags should be formatted as a single string
        const res = await fetch(`/api/upload/booru/${user.username}`, {
            method: "POST",
            body: data
        })
        if (!res.ok) {
            setPending(false);
            setError(res.error); // ?
        }
        if (res.ok) {
            setPending(true);
        }
    }
    return {image_upload, error, pending}
}