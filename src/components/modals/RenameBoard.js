import NiceModal, { useModal } from '@ebay/nice-modal-react';

// import { useImageUpload } from "../../hooks/useImageUpload";

export default NiceModal.create((name) => {
    const modal = useModal();

    // const { image_upload, error, pending } = useImageUpload();

    const exit = (_e) => {
        modal.remove();
    }

    const submit = async (e) => {
        e.preventDefault();
        // TODO
    }

    return ( // TODO - Change classNames after consolidating modal CSS classes
        <div className="image-modal rename-modal">
            <h3>Create a custom header:</h3>
            <form onSubmit={submit}>
                <input type="text" id="image-tags" autoComplete="off" spellCheck="false"/>
                <br />
                <button className="image-modal-btn">Submit changes</button>
            </form>
            <div className="modal-exit exit">
                <span className="material-symbols-outlined" onClick={exit}>
                    close
                </span>
            </div>
        </div>
    );
});