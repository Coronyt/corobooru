import NiceModal, { useModal } from '@ebay/nice-modal-react';

import { useBoardRename } from "../../hooks/useBoardRename";

export default NiceModal.create((name) => {
    const modal = useModal();

    const { send_board_name, error, pending } = useBoardRename();

    const exit = (_e) => {
        modal.remove();
    }

    const submit = async (e) => {
        e.preventDefault();
        const input = document.getElementById("new-name");
        await send_board_name(input.value);
        window.location.reload();
    }

    return ( // TODO - Change classNames after consolidating modal CSS classes
        <div className="image-modal rename-modal">
            <h3>Create a custom header:</h3>
            <form onSubmit={submit}>
                <input type="text" id="new-name" autoComplete="off" spellCheck="false"/>
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