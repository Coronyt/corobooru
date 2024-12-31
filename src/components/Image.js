import { useEffect, useState } from "react";

import { dotStream } from 'ldrs';
import { useAuthContext } from "../hooks/useAuthContext";
import { useLoadImage } from "../hooks/useLoadImage";

dotStream.register();

const Image = ({ img }) => {

    const { user } = useAuthContext();
    const [pending, setPending] = useState(true);

    const load_img = useLoadImage();

    useEffect(() => {
        const fetch_img = async () => {
            // TODO - Once again this relies on user authentication; it will eventually need to function without auth
            const img_html = document.getElementById("image-full");
            await load_img(img_html, `/api/find/booru/${user.username}/imgs_full/${img.full}`);
            setPending(false);
        }
        fetch_img();
    });

    return (
        <div className="image-main">
            <div className="image-view">
                {pending && <div className="image-ldr">
                    <l-dot-stream
                        size="60"
                        speed="2.5"
                        color="var(--font-default)"
                    ></l-dot-stream>
                </div>}
                <img src="" alt="" className="image-full" id="image-full"/>
            </div>
        </div>
    );
}
 
export default Image;