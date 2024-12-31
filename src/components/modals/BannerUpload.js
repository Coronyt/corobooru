import NiceModal, { useModal } from '@ebay/nice-modal-react';

import { useBannerUpload } from "../../hooks/useBannerUpload";

export default NiceModal.create((name) => {
    const modal = useModal();

    const { banner_upload, error, pending } = useBannerUpload();

    const exit = (_e) => {
        modal.remove();
    }

    const submit = async (e) => {
        e.preventDefault();
        const input = document.getElementById("banner-file");
        await banner_upload(input.files[0]);
        window.location.reload();
    }

    return (
        <div className="banner-modal">
            <h3>Upload a banner image</h3>
            <form onSubmit={submit}>
                <label>Select file:</label> <br />
                <input type="file" className="banner-file-select" id="banner-file"/> <br />
                <button className="banner-modal-btn">Upload banner</button>
            </form>
            <div className="modal-exit exit">
                <span className="material-symbols-outlined" onClick={exit}>
                    close
                </span>
            </div>
        </div>
    );
});