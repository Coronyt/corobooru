import Tag from "./Tag";

const Taghub = ({booru}) => {

    const tags = Object.keys(booru.tags);

    return (
        <div className="taghub">
            <ul>
                {booru.tags && tags.map((tag) => (
                    <Tag tag={tag} len={booru.tags[tag].length} />
                ))}
            </ul>
        </div>
    );
}
 
export default Taghub;