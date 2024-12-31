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

    const on_click_close_panel = (e) => {
        NiceModal.remove(BannerUpload);
        NiceModal.remove(ImageUpload);
        modal.remove();
    }

    const on_click_edit_board = (e) => {
        // TODO
    }

    const on_click_edit_theme = (e) => {
        // TODO
    }

    const on_click_view_account = (e) => {
        // TODO
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
                <div className="panel-entry" onClick={on_click_edit_board}>
                    <p>Edit board name</p>
                </div>
                <div className="panel-entry" onClick={on_click_edit_theme}>
                    <p>Edit board theme</p>
                </div>
                <div className="panel-entry" onClick={on_click_view_account}>
                    <p>View account details</p>
                </div>
                <div className="panel-entry exit" onClick={on_click_close_panel}>
                    <p>Close control panel</p>
                    <span className="material-symbols-outlined">
                        close
                    </span>
                </div>
            </div>
        </div>
    );
});