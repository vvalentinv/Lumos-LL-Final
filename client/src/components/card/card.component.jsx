import { useState } from 'react';

import { useDispatch } from 'react-redux';
import { deleteCard, updateCard } from '../../redux/card-list/card-list.actions';

import './card.styles.scss';

// import { ReactComponent as TrashLogo } from '../../assets/trash.svg';
import DeleteIcon from '@mui/icons-material/Delete';

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
        <div className='main-card-div'>       
            <div className='card'>
                <div className='card-toolbar'>
                    <span className='card-number'>{number}</span>
                    <div className='delete-logo-container'>
                        <DeleteIcon
                            className='delete-logo'
                            onClick={() => length <= 2 ? null : dispatch(deleteCard(id))}
                        />
                    </div>
                </div>
                <div className='card-input-container'>
                    <textarea
                        type='text'
                        className='input-text'
                        placeholder='Enter term'
                        value={answer}
                        onChange={event => answerHandleChange(event)}
                    >
                    </textarea>
                    <textarea
                        type='text'
                        className='input-text'
                        placeholder='Enter definition'
                        value={question}
                        onChange={event => questionHandleChange(event)}
                    >
                    </textarea>
                </div>
            </div>
        </div>

    )
};

export default Card;
