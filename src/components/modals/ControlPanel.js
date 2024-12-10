import NiceModal, { useModal } from '@ebay/nice-modal-react';

import BannerUpload from "./BannerUpload";
import ImageUpload from "./ImageUpload";

export default NiceModal.create((name) => {
    const modal = useModal();

    const on_click_banner_upload = (e) => {
        NiceModal.show(BannerUpload);
    }

    const on_click_image_upload = (e) => {
        NiceModal.show(ImageUpload);
    }

    return (
        <div className="control-panel">
            <div className="panel-list">
                <div className="panel-title">
                    <span className="material-symbols-outlined">
                        filter
                    </span>
                </div>
                <div className="panel-entry" onClick={on_click_banner_upload}>
                    <p>Upload banner image</p>
                </div>
                <div className="panel-entry" onClick={on_click_image_upload}>
                    <p>Post image to board</p>
                </div>
                <div className="panel-bookend"></div>
            </div>
        </div>
    );
});