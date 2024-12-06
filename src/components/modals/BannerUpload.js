import NiceModal, { useModal } from '@ebay/nice-modal-react';

export default NiceModal.create((name) => {
    const modal = useModal();
    return (
        <div className="banner-modal">
            <h3>Upload a banner image</h3>
            <form>
                <label>Select file:</label>
                <input type="file" className="banner-file-select" /> <br />
                <button className="banner-modal-btn">Upload banner</button>
            </form>
        </div>
    );
});