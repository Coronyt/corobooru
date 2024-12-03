import { useAuthContext } from "../hooks/useAuthContext";
import Banner from "./Banner";

const Dash = () => {

    const { user } = useAuthContext();

    const on_click_banner_upload = (e) => {
        // TODO
    }

    return (
        <div className="dash content">
            <Banner />
            <div className="dash-head">
                <h2>{user.username}'s board</h2>
                <span class="material-symbols-outlined banner-upload" onClick={on_click_banner_upload}>
                    upload_file
                </span>
            </div>
            <hr />
        </div>
    );
}
 
export default Dash;