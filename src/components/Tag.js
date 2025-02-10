const Tag = ({tag, len, active, loadf, rgen}) => {

    const activate = (e) => {
        // TODO - User should be able to click tag again to untoggle filter
        e.target.className = "tag active";
        loadf(tag);
        rgen(tag);
    }

    return (
        <li className={!active ? "tag" : "tag active"} onClick={activate}>
            <div className="tag-div">{tag}</div>
            <div className="len-div">{len}</div>
        </li>
    );
}
 
export default Tag;