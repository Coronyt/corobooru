import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

export const useBannerUpload = (file) => {
    // Initializing states (err & pending)
    const [error, setError] = useState(null);
    const [pending, setPending] = useState(null);
    // Pulling necessary refs from context provider
    const { user } = useAuthContext();
    // console.log(user.username);
    // ___
    // const input = document.getElementById("banner-file"); // TEMP DOM query
    // const username = user.username;
    // const data = new FormData();
    // data.append('file', input.files[0]);
    // data.append('user', user.username);
    // console.log(data);
    // ___
    // Sending POST request with fetch()
    const banner_upload = async (file) => {
        setPending(true); // Set pending
        setError(null); // Reset errors
        const data = new FormData();
        data.append('file', file);
        data.append('user', user.username);
        // console.log(data);
        // TODO - Method should be POST or PATCH depending on whether or not the user already has a banner
            // At the moment it is just uploading a new image every time and not deleting the old one
        const res = await fetch("/api/upload/banner", {
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
    return {banner_upload, error, pending}
}