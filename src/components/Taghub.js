import Tag from "./Tag";

const Taghub = ({booru, filters, setf, appf, rgen}) => {

    const tags = Object.keys(booru.tags);

    const load_filter = (tag) => {
        let newf = [...filters];
        newf.push(tag);
        setf(newf);
        appf(newf, booru);
    }

    return (
        <div className="taghub">
            <ul>
                {booru.tags && tags.map((tag) => (
                    <Tag tag={tag} len={booru.tags[tag].length} active={
                        (filters) 
                        && (filters.length > 0) 
                        && (filters.includes(tag)) ? true : false
                    } loadf={load_filter} rgen={rgen} />
                ))}
            </ul>
        </div>
    );
}
 
export default Taghub;