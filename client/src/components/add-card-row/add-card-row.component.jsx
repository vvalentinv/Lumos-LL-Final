
import './add-card-row.styles.scss'

const AddCardRow = ({ addCardHandler }) => {
    return (
        <div className='add-card-row' onClick={addCardHandler}>
            <div className='add-card-center'>
                <span className='add-card-row-text'>+ ADD CARD</span>
            </div>
        </div>

    )
}

export default AddCardRow;