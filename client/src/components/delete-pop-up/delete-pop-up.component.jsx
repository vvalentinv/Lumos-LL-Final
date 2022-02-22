
import './delete-pop-up.styles.scss';

import CustomButton from '../custom-button/custom-button.component';

const DeletePopUp = ({ handleDeleteTrue, handleDeleteFalse }) => {
    return (
        <div className='delete-pop-up-wrapper'>
            <div className='delete-pop-up-container'>
                <p>Are you sure you want to delete this deck?</p>
                <div className='delete-pop-up-buttons'>
                    <CustomButton className="delete-pop-up_buttonCancel" onClick={handleDeleteFalse}>
                        Cancel
                    </CustomButton>
                    <CustomButton className="delete-pop-up_buttoDelete" onClick={handleDeleteTrue}>
                        Confirm
                    </CustomButton>
                </div>
            </div>
        </div>
    );
}

export default DeletePopUp;