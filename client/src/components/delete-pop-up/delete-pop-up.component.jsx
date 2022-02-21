
const DeletePopUp = ({ handleDeleteTrue, handleDeleteFalse }) => {
    return (
        <div className="modal">
            <div className="modal_box">
                <p>Are you sure you want to delete this deck?</p>
                <button className="modal_buttonCancel" onClick={handleDeleteFalse}>
                    Cancel
                </button>
                <button className="modal_buttoDelete" onClick={handleDeleteTrue}>
                    Confirm
                </button>
            </div>
        </div>
    );
}

export default DeletePopUp;