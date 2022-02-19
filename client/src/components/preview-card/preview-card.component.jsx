
const PreviewCard = (props) => {
    const { term, definition } = props;

    return (
        <>
           <div className='definition'>
                <p>{definition}</p> 
            </div>
            <div className='term'>
                <p>{term}</p>
            </div> 
        </>
    )


}

export default PreviewCard;
