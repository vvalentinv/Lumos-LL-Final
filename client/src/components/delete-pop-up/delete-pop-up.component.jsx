
import './delete-pop-up.styles.scss';

const DeletePopUp = ({ handleDeleteTrue, handleDeleteFalse }) => {
    return (
        <div className='delete-pop-up-wrapper'>
            <div className='delete-pop-up-container'>
                <p>Are you sure you want to delete this deck?</p>
                <div className='delete-pop-up-buttons'>
                    <button className="delete-pop-up_buttonCancel" onClick={handleDeleteFalse}>
                        Cancel
                    </button>
                    <button className="delete-pop-up_buttoDelete" onClick={handleDeleteTrue}>
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DeletePopUp;