import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteCard, updateCard, updateCardIsPublic } from '../../redux/card-list/card-list.actions';

import './card.styles.scss';

import DeleteIcon from '@mui/icons-material/Delete';

const Card = (props) => {
    const {
        userUUID,
        id,
        cid,
        term,
        definition,
        length,
        number,
        submitted,
        isSubmitted,
        isPublic
    } = props;

    const [question, setQuestion] = useState(term);
    const [answer, setAnswer] = useState(definition);
    const [active, setActive] = useState(isPublic);

    const [isPublicStatus, setIsPublic] = useState(isPublic);

    const [replicatedAnswer, setReplicatedAnswer] = useState('');
    const [replicatedQuestion, setReplicatedQuestion] = useState('');

    const dispatch = useDispatch();

    useEffect(() => {
        if (submitted) {
            setQuestion('');
            setAnswer('');
            isSubmitted(!submitted);
        }
    }, [submitted])

    const questionHandleChange = (event) => {
        setQuestion(event.target.value);
        setReplicatedQuestion(event.target.value);

        dispatch(updateCard({
            id,
            field: 'term',
            value: event.target.value,
        }));
    }

    const answerHandleChange = (event) => {
        setAnswer(event.target.value);
        setReplicatedAnswer(event.target.value);

        dispatch(updateCard({
            id,
            field: 'definition',
            value: event.target.value,
        }));
    }

    return (
        <div className='main-card-div'>
            <div className='deck-card'>
                <div className='card-toolbar'>
                    <span className='card-number'>{number}</span>
                    {/* <div className='set-visibility-button-container' onClick={() => {
                        dispatch(updateCardIsPublic(id));
                        setActive(!active);
                    }}>
                        <label className="private-toggle">private</label>
                        <input type='checkbox' class='toggle' checked={active}>
                        </input>
                        <label>public</label>
                    </div> */}
                    <div className="main-public-delete">
                    <div className='set-visibility-button-container'>
                        <label className="private-label">Private</label>
                        <div onClick={() => {
                        dispatch(updateCardIsPublic(id));
                        setActive(!active);
                    }}>
                            <input type='checkbox' class='toggle' checked={active}></input>
                            <label></label>
                        </div>
                        <label className="public-label">Public</label>

                    </div>
                    <div className='delete-logo-container'>             
                    </div>
                        <DeleteIcon
                            className='delete-logo'
                            onClick={() => length <= 2 ? null : dispatch(deleteCard(id))}
                        />
                    </div>
                </div>
                <div className='card-input-container'>
                    <div className='grow-wrap grow-wrap-answer' data-replicated-answer={replicatedAnswer}>
                        <textarea
                            className='input-text'
                            placeholder='Enter term'
                            value={question}
                            onChange={event => questionHandleChange(event)}
                        />
                    </div>
                    <div className='grow-wrap grow-wrap-question' data-replicated-question={replicatedQuestion}>
                        <textarea
                            className='input-text'
                            placeholder='Enter definition'
                            value={answer}
                            onChange={event => answerHandleChange(event)}
                        />
                    </div>
                </div>
            </div>
        </div>

    )
};

export default Card;