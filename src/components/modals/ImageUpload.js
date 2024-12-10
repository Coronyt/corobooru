import NiceModal, { useModal } from '@ebay/nice-modal-react';

import { useImageUpload } from "../../hooks/useImageUpload";

export default NiceModal.create((name) => {
    const modal = useModal();

    const submit = async (e) => {
        e.preventDefault();
        // TODO
    }

    return (
        <div className="image-modal">
            <h3>image-modal</h3>
            <form onSubmit={submit}>
                <label>Select file:</label>
                <input type="file" className="image-file-select" id="image-file"/> <br />
                <button className="image-modal-btn">Upload banner</button>
            </form>
        </div>
    );
});