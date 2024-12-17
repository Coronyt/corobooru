import Tag from "./Tag";

const Taghub = ({booru}) => {

    const tags = Object.keys(booru.tags);

    return (
        <div className="taghub">
            <ul>
                {booru.tags && tags.map((tag) => (
                    <Tag tag={tag} />
                ))}
            </ul>
        </div>
    );
}
 
export default Taghub;