import { useEffect, useState } from "react";

import { dotStream } from 'ldrs';
import { useLoadImage } from "../hooks/useLoadImage";
import { useParams } from "react-router-dom";

dotStream.register();

const Image = () => {

    const [pending, setPending] = useState(true);

    const [editmode, setEditmode] = useState(false); // If user is editing Image details
    const [detailmode, setDetailmode] = useState(false); // If user is viewing Image details

    let { user: username, id } = useParams();

    const load_img = useLoadImage();

    useEffect(() => {
        const fetch_img = async () => {
            const img_html = document.getElementById("image-full");
            await load_img(img_html, `/api/find/booru/${username}/imgs_full/${id}`);
            setPending(false);
        }
        fetch_img();
        // TODO - Need to create a reference to the image document somewhere in this component
            // Currently this image component is only getting an rstream back from the API
            // There needs to be logic in the component for getting the image document
                // Then mapping the respective fields to the image-details element
            // Can start by mapping user -> booru -> img
                // Used API to find booru by user
                // Then find img in booru by ID
                // Store img in local field
    });

    const show_details = () => {
        setDetailmode(!detailmode);
    }

    const img_expand = () => {
        const img_html = document.getElementById("image-full");
        if (img_html.className == "image-full") {
            img_html.className = "image-maxed";
        } else {
            img_html.className = "image-full";
        }
    }

    // console.log(img);

    return (
        <div className="image-main content">
            <div className="image-view">
                {pending && <div className="image-ldr">
                    <l-dot-stream
                        size="60"
                        speed="2.5"
                        color="var(--font-default)"
                    ></l-dot-stream>
                </div>}
                <img src="" alt="" className="image-full" id="image-full" onClick={img_expand}/>
            </div>
            <div className="image-details" onClick={show_details}>
                <div className="image-detail">
                    <p>desc:</p>
                    <p>None</p>
                </div>
                {detailmode && <div>
                    <div className="image-detail">
                        <p>author:</p>
                        <p>None</p>
                    </div>
                    <div className="image-detail">
                        <p>source:</p>
                        <p>None</p>
                    </div>
                    <div className="image-detail">
                        <p>img_date:</p>
                        <p>None</p>
                    </div>
                    <div className="image-detail">
                        <p>post_date:</p>
                        <p>None</p>
                    </div>
                    <div className="image-detail">
                        <p>tags:</p>
                        <p>None</p>
                    </div>
                </div>}
            </div>
            <div className="image-footer">
                <p>Image displaying at 100% resolution</p>
                <span className="material-symbols-outlined">
                    open_in_full
                </span>
            </div>
        </div>
    );
}
 
export default Image;