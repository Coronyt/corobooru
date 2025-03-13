import { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { trio } from 'ldrs';
import { useLoadImage } from "../hooks/useLoadImage";
import { useParams } from "react-router-dom";

trio.register();

const Thumbnail = ({ img }) => {

    const [pending, setPending] = useState(true);
    let { user: username } = useParams();
    const load_img = useLoadImage();

    // console.log(img.tags);

    useEffect(() => {
            const fetch_thumbnail = async () => {
                const thumb_img = document.getElementById("thumb-img-" + img.full);
                await load_img(thumb_img, `/api/find/booru/${username}/imgs_thumb/${img.full}`);
                setPending(false);
            }
            fetch_thumbnail();
        }, []);

    return (
        <Link to={`/u/${username}/booru/img/${img.full}`}>
            <div className="thumbnail">
                {pending && <div className="thumb-ldr">
                    <l-trio
                        size="30"
                        speed="0.8"
                        color="var(--font-default)"
                    ></l-trio>
                </div>}
                <img src="" alt="" className="thumb-img" id={"thumb-img-" + img.full}/>
            </div>
        </Link>
    );
}
 
export default Thumbnail;