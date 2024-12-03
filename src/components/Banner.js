import { useState, useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

import { ring } from 'ldrs';

ring.register();

// TODO - I think I should make this function a hook so it can be used by other components
const load_img = (img, url) => {
    return new Promise((resolve, reject) => {
        img.src = url;
        img.onload = () => resolve(img);
        img.onerror = () => reject(img);
    });
}

const Banner = () => {

    const { user } = useAuthContext();
    // const [banner, setBanner] = useState("");
    const [pending, setPending] = useState(true);

    console.log("Banner loaded");
    console.log(user.username)

    useEffect(() => {
        const fetch_banner = async () => {
            // Fetching banner by username w/ authorization
            // const response = await fetch(`/api/find/banner/${user.username}`, {
            //     headers: {"Authorization": `Bearer ${user.token}`}
            // });
            // if (response.ok) {}
            // document.getElementById("banner-img").setAttribute("src", `/api/find/banner/${user.username}`);
            const img = document.getElementById("banner-img");
            await load_img(img, `/api/find/banner/${user.username}`);
            console.log("Loaded image");
            setPending(false);
        }
        // Only make request if user is logged in
        if (user) {
            fetch_banner();
        }
    }, [user]);

    return (
        <div className="banner">
            {pending && <l-ring
                size="40"
                stroke="5"
                bg-opacity="0"
                speed="2" 
                color="white" 
            ></l-ring>}
            <img src="" alt="" className="banner-img" id="banner-img"/>
        </div>
    );
}
 
export default Banner;