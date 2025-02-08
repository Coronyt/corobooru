import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const Tag = ({tag, len, active, loadf}) => {

    let { user: username } = useParams();

    const activate = () => {
        loadf(tag);
    }

    return (
        <Link to={`/u/${username}/booru/${tag}`}>
            <li className={!active ? "tag" : "tag active"} onClick={activate}>
                <div className="tag-div">{tag}</div>
                <div className="len-div">{len}</div>
            </li>
        </Link>
    );
}
 
export default Tag;