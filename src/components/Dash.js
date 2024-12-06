// import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react' // TODO - Uninstall this package
import { useAuthContext } from "../hooks/useAuthContext";
import { useState } from "react";
import Banner from "./Banner";

import NiceModal from '@ebay/nice-modal-react';
// import TestModal from "./modals/BannerUpload"; // TEMP
import ControlPanel from "./modals/ControlPanel";

const Dash = () => {

    const { user } = useAuthContext();
    // let [isOpen, setIsOpen] = useState(false);

    const on_click_banner_upload = (e) => {
        // NiceModal.show(TestModal, {name: "Test"});
        NiceModal.show(ControlPanel);
    }

    return (
        <div className="dash content">
            <Banner />
            <div className="dash-head">
                <h2>{user.username}'s board</h2>
                <span className="material-symbols-outlined banner-upload" onClick={on_click_banner_upload}>
                    menu
                </span>
            </div>
            <hr />
        </div>
    );
}
 
export default Dash;