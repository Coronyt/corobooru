import { Navigate, useParams } from "react-router-dom";
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
    const [filters, setFilters] = useState([]);

    let { user: username, coll } = useParams();

    console.log(coll);

    // if (coll) {
    //     // TODO - Need to process coll param here
    //         // A valid coll string will be a series of one or more words (tags) separated by dashes
    //         // i.e. corobooru.io/xenophon/booru/ww1-french_army-service_rifle-standard_issue
    //         // So we split the string and store the array locally with setFilters()
    //     const URL_coll = coll.split("-");
    //     // console.log(URL_coll);
    //     // setFilters(URL_coll);
    // }

    const apply_collection = () => {
        // TODO
    }

    useEffect(() => {
        const load_booru = async () => {
            const res = await fetch(`/api/find/booru/${username}`);
            const json = await res.json();
            if (res.ok) {
                setBooru(json);
                if (coll) { // Checking if loading a collection
                    const URL_coll = coll.split("-");
                    console.log(URL_coll);
                    setFilters(URL_coll);
                    apply_collection();
                }
            }
        }
        if (user) {
            load_booru();
        }
    }, [user]);

    const on_click_banner_upload = (e) => {
        NiceModal.show(ControlPanel);
    }

    return (
        <div className="dash content">
            <Banner />
            <div className="dash-head">
            <h2>{username}'s board</h2>
            <span className="material-symbols-outlined banner-upload" onClick={on_click_banner_upload}>
                menu
            </span>
            </div>
            <hr />
            {!booru.imgs && <p>Loading ...</p>} {/* TODO - Render loader component here */}
            {booru.imgs && <div className="dash-body">
                <Taghub booru={booru} />
                <Booru booru={booru} />
            </div>}
        </div>
    );
}
 
export default Dash;