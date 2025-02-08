import { useEffect, useState } from "react";

import Banner from "./Banner";
import Booru from "./Booru";
import ControlPanel from "./modals/ControlPanel";
import NiceModal from '@ebay/nice-modal-react';
import Taghub from "./Taghub";
import { useAuthContext } from "../hooks/useAuthContext";
import { useParams } from "react-router-dom";

const Dash = () => {

    const { user } = useAuthContext();
    const [booru, setBooru] = useState({});
    const [filters, setFilters] = useState([]);
    const [filtered, setFiltered] = useState([]);

    let { user: username, coll } = useParams();

    const apply_coll = (coll, booru) => {
        let res = [];
        const curr = coll;
        let bound = Infinity;
        let ref;
        let i = 0;
        curr.forEach((tag) => {
            const tagmap = booru.tags[tag];
            if (tagmap.length < bound) {
                bound = tagmap.length;
                ref = i;
            } i++;
        });
        res = booru.tags[curr[ref]]; // Assigning tagmap to res array
        curr.splice(ref, 1); // Remove 1 element at index ref
        curr.forEach((tag) => {
            res.forEach((img) => {
                if (!img.tags.includes(tag)) {
                    res.splice(res.indexOf(img), 1);
                }
            })
            curr.splice(curr.indexOf(tag), 1);
        });
        setFiltered(res);
    }

    useEffect(() => {
        const load_booru = async () => {
            const res = await fetch(`/api/find/booru/${username}`);
            const json = await res.json();
            if (res.ok) {
                setBooru(json);
                if (coll) { // Checking if loading a collection
                    const URL_coll = coll.split("-");
                    let filters_to_load = [];
                    URL_coll.forEach((tag) => {
                        filters_to_load.push(tag);
                        setFilters(filters_to_load);
                    });
                    apply_coll(URL_coll, json);
                }
            }
        }
        load_booru();
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
                <Taghub booru={booru} filters={filters} setf={setFilters} appf={apply_coll}/>
                <Booru booru={booru} filtered={filtered} />
            </div>}
        </div>
    );
}
 
export default Dash;