
const PreviewCard = (props) => {
    const { term, definition } = props;

    return (
        <>
            
            <p>{definition}</p>
            <p>{term}</p>
        </>
    )


}

export default PreviewCard;
