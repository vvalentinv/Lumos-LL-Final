import { useState } from 'react';

import { useDispatch } from 'react-redux';
import { deleteCard, updateCard } from '../../redux/card-list/card-list.actions';

import './card.styles.scss';

import { ReactComponent as TrashLogo } from '../../assets/trash.svg';

const Card = (props) => {

    const { id, term, definition, length, number } = props;

    const [question, setQuestion] = useState(term);
    const [answer, setAnswer] = useState(definition);

    const dispatch = useDispatch();

    const questionHandleChange = (event) => {
        setQuestion(event.target.value);

        dispatch(updateCard({
            id,
            field: 'term',
            value: event.target.value,
        }));
    }

    const answerHandleChange = (event) => {
        setAnswer(event.target.value);

        dispatch(updateCard({
            id,
            field: 'definition',
            value: event.target.value,
        }));
    }

    return (
        <div className='card'>
            <div className='card-toolbar'>
                <span className='card-number'>{number}</span>
                <div className='delete-logo-container'>
                    <TrashLogo
                        className='delete-logo'
                        onClick={() => length <= 2 ? null : dispatch(deleteCard(id))}
                    />
                </div>
            </div>
            <div className='card-input-container'>
                <textarea
                    type='text'
                    className='input-text'
                    placeholder='Card Front'
                    value={question}
                    onChange={event => questionHandleChange(event)}
                >
                </textarea>
                <input
                    type='text'
                    className='input-text-a'
                    placeholder='Enter definition'
                    value={answer}
                    onChange={event => answerHandleChange(event)}
                >
                </input>

            </div>
        </div>

    )
};

export default Card;
