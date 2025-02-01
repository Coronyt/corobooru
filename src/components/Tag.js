const Tag = ({tag, len, active}) => {
    return (
        <li className={!active ? "tag" : "tag active"}>
            <div className="tag-div">{tag}</div>
            <div className="len-div">{len}</div>
        </li>
    );
}
 
export default Tag;