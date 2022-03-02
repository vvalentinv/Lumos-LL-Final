

import CustomButton from '../custom-button/custom-button.component';

import './delete-pop-up.styles.scss';

const DeletePopUp = ({ handleDeleteTrue, handleDeleteFalse }) => {
    return (
        <div className='delete-pop-up-wrapper'>
            <div className='delete-pop-up-container'>
                <h1 className='delete-pop-up-warning'>Are you sure you want to delete this deck?</h1>
                <div className='delete-pop-up-buttons'>
                    <CustomButton className='pop-up-cancel-button' onClick={handleDeleteFalse}>
                        Cancel
                    </CustomButton>
                    <div className='pop-up-delete-button'>
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