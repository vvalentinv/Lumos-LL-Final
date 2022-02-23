
import './preview-card.styles.scss'

const PreviewCard = (props) => {
    const { term, definition } = props;

    return (
        <div className="q-a">
            <div className='answer'>
                {definition}
            </div>
            <div className="vertical"></div>
            <div className='question'>
                {term}
            </div>
        </div>
    )
}

export default PreviewCard;
