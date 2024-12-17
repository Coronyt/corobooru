import { useEffect, useState } from "react";

import Banner from "./Banner";
import Booru from "./Booru";
import ControlPanel from "./modals/ControlPanel";
import Image from "./Image";
import NiceModal from '@ebay/nice-modal-react';
import Taghub from "./Taghub";
import { useAuthContext } from "../hooks/useAuthContext";

const Dash = () => {

    const { user } = useAuthContext();
    
    const [booru, setBooru] = useState({});
    const [view, setView] = useState(false);
    const [img, setImg] = useState({});
    
    const switch_view = (img) => {
        setView(true);
        setImg(img);
    }

    useEffect(() => {
        const load_booru = async () => {
            // TODO - Currently the booru will only be fetched if user is logged in
                // Will have to implement handlers for public booru content
            const res = await fetch(`/api/find/booru/${user.username}`, {
                // TODO - Final implementation should not use user token
                headers: {"Authorization": `Bearer ${user.token}`}
            });
            const json = await res.json();
            if (res.ok) {
                setBooru(json);
            }
        }
        if (user) {
            load_booru();
        }
    }, [user]);

    const on_click_banner_upload = (e) => {
        NiceModal.show(ControlPanel);
    }
    
    useEffect(() => {
        const load_booru = async () => {
            // TODO - Currently the booru will only be fetched if user is logged in
                // Will have to implement handlers for public booru content
            const res = await fetch(`/api/find/booru/${user.username}`, {
                headers: {"Authorization": `Bearer ${user.token}`}
            });
            const json = await res.json();
            if (res.ok) {
                setBooru(json);
            }
        }
        if (user) {
            load_booru();
        }
    }, [user]);

    return (
        <div className="dash content">
            {!view && <Banner />}
            {!view && 
                <div className="dash-head">
                <h2>{user.username}'s board</h2>
                <span className="material-symbols-outlined banner-upload" onClick={on_click_banner_upload}>
                    menu
                </span>
                </div>
            }
            {!view && <hr />}
            {!booru.imgs && !view && <p>Loading ...</p>} {/* TODO - Render loader component here */}
            {booru.imgs && !view && <div className="dash-body">
                <Taghub booru={booru} />
                <Booru booru={booru} sv={switch_view} />
            </div>}
            {booru.imgs && view && <div className="dash-body">
                <Image img={img}/>
            </div>}
        </div>
    );
}
 
export default Dash;