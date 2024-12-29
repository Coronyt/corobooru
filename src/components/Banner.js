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

    const [pending, setPending] = useState(true);
    const [banner, setBanner] = useState(true);

    useEffect(() => {
        const fetch_banner = async () => {
            const img = document.getElementById("banner-img");
            await load_img(img, `/api/find/banner/${user.username}`)
                .then(
                    (resolved) => {
                        setPending(false);
                    },
                    (rejected) => {
                        img.src = "";
                        const banner_div = document.getElementById("banner-div");
                        banner_div.classList.add("banner-default");
                        setPending(false);
                        setBanner(false);
                    }
                );
        }
        // Only make request if user is logged in
        if (user) {
            fetch_banner();
        }
    }, [user]);

    return (
        // TODO - Upload button will display if user is logged in (check AuthContext)
        <div className="banner" id="banner-div">
            {pending && <div className="banner-ldr">
                <l-dot-stream
                    size="60"
                    speed="2.5"
                    color="var(--font-default)"
                ></l-dot-stream>
            </div>}
            {!banner && <div className="banner-default-text">
                <h2>the owner of this board has not uploaded a banner 😞</h2>
            </div>}
            <img src="" alt="" className="banner-img" id="banner-img"/>
        </div>
    );
}
 
export default Banner;