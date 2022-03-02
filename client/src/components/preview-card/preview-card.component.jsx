
import './preview-card.styles.scss'

const PreviewCard = (props) => {
    const { term, definition } = props;

    return (
        <div className="preview-card">
            <div className='preview-card-question'>
                {definition}
            </div>
            <div className="preview-card-divider"></div>
            <div className='preview-card-answer'>
                {term}
            </div>
        </div>
    )
}

export default PreviewCard;
