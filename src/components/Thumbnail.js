import { useEffect, useState } from "react";

import { trio } from 'ldrs';
import { useAuthContext } from "../hooks/useAuthContext";
import { useLoadImage } from "../hooks/useLoadImage";

trio.register();

const Thumbnail = ({ img, sv }) => {

    const { user } = useAuthContext();
    const [pending, setPending] = useState(true);

    const load_img = useLoadImage();

    const open_img = (_e) => {
        sv(img);
    }

    useEffect(() => {
            const fetch_thumbnail = async () => {
                const thumb_img = document.getElementById("thumb-img-" + img.full);
                await load_img(thumb_img, `/api/find/booru/${user.username}/imgs_thumb/${img.full}`);
                setPending(false);
            }
            fetch_thumbnail();
        }, []);

    return (
        <div className="thumbnail" onClick={open_img}>
            {pending && <div className="thumb-ldr">
                <l-trio
                    size="30"
                    speed="0.8"
                    color="var(--font-default)"
                ></l-trio>
            </div>}
            <img src="" alt="" className="thumb-img" id={"thumb-img-" + img.full}/>
        </div>
    );
}
 
export default Thumbnail;