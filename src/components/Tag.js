const Tag = ({tag, len}) => {
    return (
        <li className="tag">
            <div className="tag-div">{tag}</div>
            <div className="len-div">{len}</div>
        </li>
    );
}
 
export default Tag;