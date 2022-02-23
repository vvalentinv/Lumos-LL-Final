
import './delete-pop-up.styles.scss';

import CustomButton from '../custom-button/custom-button.component';

const DeletePopUp = ({ handleDeleteTrue, handleDeleteFalse }) => {
    return (
        <div className='delete-pop-up-wrapper'>
            <div className='delete-pop-up-container'>
                <h1 className='delete-warning'>Are you sure you want to delete this deck?</h1>
                <div className='delete-pop-up-buttons'>
                    <CustomButton className='delete-Cancel' onClick={handleDeleteFalse}>
                        Cancel
                    </CustomButton>
                    <div className='delete-Delete'>
                        <CustomButton onClick={handleDeleteTrue}>
                            Confirm
                        </CustomButton>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DeletePopUp;