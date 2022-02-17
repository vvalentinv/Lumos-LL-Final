
const PreviewCard = (props) => {
    const { term, definition } = props;

    return (
        <>
            <p>{term}</p>
            <p>{definition}</p>
        </>
    )


}

export default PreviewCard;