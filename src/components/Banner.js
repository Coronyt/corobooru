import { useEffect, useState } from "react";

import { dotStream } from 'ldrs';
import { useLoadImage } from "../hooks/useLoadImage";
import { useParams } from "react-router-dom";

dotStream.register();

const Banner = () => {

    const [pending, setPending] = useState(true);
    const [banner, setBanner] = useState(true);

    let { user: username } = useParams();

    const load_img = useLoadImage();

    useEffect(() => {
        const fetch_banner = async () => {
            const img = document.getElementById("banner-img");
            await load_img(img, `/api/find/banner/${username}`)
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
        fetch_banner();
    }, []);

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
                <h2>The owner of this board has not uploaded a banner 😞</h2>
            </div>}
            <img src="" alt="" className="banner-img" id="banner-img"/>
        </div>
    );
}
 
export default Banner;