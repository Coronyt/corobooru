import { useEffect, useState } from "react";

import { dotStream } from 'ldrs';
import { useAuthContext } from "../hooks/useAuthContext";

dotStream.register();

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
        // TODO - Upload button will display if user is logged in (check AuthContext)
        <div className="banner">
            {pending && <div className="banner-ldr">
                <l-dot-stream
                    size="60"
                    speed="2.5"
                    color="white"
                ></l-dot-stream>
            </div>}
            <img src="" alt="" className="banner-img" id="banner-img"/>
        </div>
    );
}
 
export default Banner;