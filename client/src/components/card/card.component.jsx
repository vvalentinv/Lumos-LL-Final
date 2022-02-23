import { useEffect, useState } from 'react';
import axios from 'axios';

import { useDispatch } from 'react-redux';
import { deleteCard, updateCard } from '../../redux/card-list/card-list.actions';

import './card.styles.scss';

import DeleteIcon from '@mui/icons-material/Delete';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

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

    const [isPublicStatus, setIsPublic] = useState(isPublic)

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
    console.log('CARD STATUS', isPublicStatus)
    const changeVisibilityStatus = (isPublicStatus) => {
        setIsPublic(!isPublicStatus)
        axios.post(`http://localhost:8080/api/cards/change`, { cid, isPublicStatus, userUUID })
    }

    return (
        <div className='main-card-div'>
            <div className='deck-card'>
                <div className='card-toolbar'>
                    <span className='card-number'>{number}</span>
                    <div className='set-visibility-button-container' onClick={() => changeVisibilityStatus(cid, isPublicStatus, userUUID)}>
                        <CheckBoxIcon classname='set-visibility-button' />
                    </div>
                    <div className='delete-logo-container'>
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
