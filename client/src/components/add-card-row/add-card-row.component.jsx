
import './add-card-row.styles.scss'

const AddCardRow = ({ addCardHandler }) => {
    return (
        <div className='add-row-card-container' onClick={addCardHandler}>
            <div className='add-card-main'>
                <div className='add-card-div'>
                    <span className='add-card-row-text'>+ ADD CARD</span>
                </div>
            </div>
        </div>
    )
}

export default AddCardRow;