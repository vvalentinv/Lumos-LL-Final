
import './add-card-row.styles.scss';

const AddCardRow = ({ addCardHandler }) => {
    return (
        <div className='add-row-card-container' onClick={addCardHandler}>
            <span className='add-card-row-text'>+ ADD CARD</span>
        </div>
    )
}

export default AddCardRow;