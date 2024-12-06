import NiceModal, { useModal } from '@ebay/nice-modal-react';

export default NiceModal.create((name) => {
    const modal = useModal();
    return (
        <div className="control-panel">
            <div className="panel-list">
                <div className="panel-title">
                    <span className="material-symbols-outlined">
                        filter
                    </span>
                </div>
                <div className="panel-entry">
                    <p>Upload banner image</p>
                </div>
                <div className="panel-entry">
                    <p>Post image to board</p>
                </div>
                <div className="panel-bookend"></div>
            </div>
        </div>
    );
});