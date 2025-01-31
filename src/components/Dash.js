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
    const [filtered, setFiltered] = useState([]);

    let { user: username, coll } = useParams();

    // console.log(coll);

    // if (coll) {
    //     // TODO - Need to process coll param here
    //         // A valid coll string will be a series of one or more words (tags) separated by dashes
    //         // i.e. corobooru.io/xenophon/booru/ww1-french_army-service_rifle-standard_issue
    //         // So we split the string and store the array locally with setFilters()
    //     const URL_coll = coll.split("-");
    //     // console.log(URL_coll);
    //     // setFilters(URL_coll);
    // }

    const apply_coll = (coll, booru) => {
        // 1. Init temp res array
            // 1.5 Init temp copy of filters array
        // 2. Determine the tag in filters which maps to the array with the shortest length
        // 3. Remove this tag from (local) filters array and append respective images to res array
        // 4. Then, for each remaining tag in the local filters array ...
            // 5. Iterate through each remaining image in res array
                // 6. If the image does not map to curr tag:
                    // 7. Remove the image from res array
            // 8. Then remove the tag from local filters
        // 9. After the local filter array is emptied, the res array will contain the filtered booru
        // 10. Save the newly filtered booru to a local state separate from the unfiltered booru state
        let res = [];
        const curr = coll;
        let bound = Infinity;
        let ref;
        let i = 0;
        curr.forEach((tag) => {
            // Determine the tag which maps to the array with the shortest length
            const tagmap = booru.tags[tag];
            // console.log(tagmap.length);
            if (tagmap.length < bound) {
                bound = tagmap.length;
                ref = i;
            } i++;
        });
        // console.log("Final bound: ", bound);
        res = booru.tags[curr[ref]]; // Assigning tagmap to res array
        curr.splice(ref, 1); // Remove 1 element at index ref
        // console.log(curr);
        curr.forEach((tag) => {
            // Then, for each remaining tag in the local filters array ...
            // Iterate through each remaining image in res array
            // console.log(res);
            res.forEach((img) => {
                // If the image does not map to curr tag:
                    // Remove the image from res array
                // console.log(img.tags);
                if (!img.tags.includes(tag)) {
                    res.splice(res.indexOf(img), 1);
                }
            })
            // Then remove the tag from local filters
            curr.splice(curr.indexOf(tag), 1);
        });
        // After the local filter array is emptied, the res array will contain the filtered booru
        console.log(res);
        // Save the newly filtered booru to a local state separate from the unfiltered booru state
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
                    // console.log(URL_coll);
                    setFilters(URL_coll);
                    apply_coll(URL_coll, json);
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