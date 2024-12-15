import { useEffect, useState } from "react";

import Banner from "./Banner";
import Booru from "./Booru";
import ControlPanel from "./modals/ControlPanel";
import NiceModal from '@ebay/nice-modal-react';
import Taghub from "./Taghub";
import { useAuthContext } from "../hooks/useAuthContext";

const Dash = () => {

    const { user } = useAuthContext();

    const [booru, setBooru] = useState({});

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
            <Banner />
            <div className="dash-head">
                <h2>{user.username}'s board</h2>
                <span className="material-symbols-outlined banner-upload" onClick={on_click_banner_upload}>
                    menu
                </span>
            </div> <hr />
            <div className="dash-body">
                <Taghub />
                <Booru />
            </div>
        </div>
    );
}
 
export default Dash;