const Tag = ({tag, len, active, loadf, rgen, unloadf, rrev}) => {

    const activate = (e) => {
        if (e.target.className == "tag active") {
            unloadf(tag);
            rrev(tag);
        } else {
            loadf(tag);
            rgen(tag);
        }
    }

    return (
        <li className={!active ? "tag" : "tag active"} onClick={activate}>
            <div className="tag-div">{tag}</div>
            <div className="len-div">{len}</div>
        </li>
    );
}
 
export default Tag;