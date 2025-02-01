import Tag from "./Tag";
import { useEffect } from "react";

const Taghub = ({booru, filters}) => {

    const tags = Object.keys(booru.tags);

    return (
        <div className="taghub">
            <ul>
                {booru.tags && tags.map((tag) => (
                    <Tag tag={tag} len={booru.tags[tag].length} active={
                        (filters) 
                        && (filters.length > 0) 
                        && (filters.includes(tag)) ? true : false
                    } />
                ))}
            </ul>
        </div>
    );
}
 
export default Taghub;