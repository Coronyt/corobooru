import NiceModal, { useModal } from '@ebay/nice-modal-react';

import { useImageUpload } from "../../hooks/useImageUpload";

export default NiceModal.create((name) => {
    const modal = useModal();

    const { image_upload, error, pending } = useImageUpload();

    const submit = async (e) => {
        e.preventDefault();
        const input = document.getElementById("image-file");
        const tags = document.getElementById("image-tags").value;
        await image_upload(input.files[0], tags);
        window.location.reload();
    }

    return (
        <div className="image-modal">
            <h3>image-modal</h3>
            <form onSubmit={submit}>
                <label>Select file: </label>
                <input type="file" className="image-file-select" id="image-file"/> <br />
                <label>Tags: </label>
                <input type="text" id="image-tags" />
                <button className="image-modal-btn">Post image</button>
            </form>
        </div>
    );
});