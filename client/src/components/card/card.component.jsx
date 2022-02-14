import { useDispatch } from 'react-redux';
import { deleteCard } from '../../redux/card-list/card-list.actions';

import './card.styles.scss';

import { ReactComponent as TrashLogo } from '../../assets/trash.svg';
import { useState } from 'react';

// const saveCard = () => {

// }

const Card = (props) => {
    const { id, term, definition } = props;

    const [question, setQuestion] = useState(term);
    const [answer, setAnswer] = useState(definition);

    const dispatch = useDispatch();

    //How do I batch all the separate useState hooks into cardList
    //How do I update isUpdated flag onChange?

    return (
        <div className='card'>
            <div className='card-toolbar'>
                <span>Card {id}</span>
                <div className='delete-logo-container'>
                    <TrashLogo
                        className='delete-logo'
                        onClick={() => dispatch(deleteCard(id))}
                    />
                </div>
            </div>
            <div className='card-input-container'>
                <input
                    type='text'
                    className='input-text'
                    placeholder='Enter term'
                    value={term}
                    onChange={event => setQuestion(event.target.value)}
                >
                </input>
                <input
                    type='text'
                    className='input-text'
                    placeholder='Enter definition'
                    value={definition}
                    onChange={event => setAnswer(event.target.value)}
                >
                </input>
            </div>
        </div>

    )
}

export default Card;

//mapStateToProps isUpdated

//Dont display save button if !isUpdated

//Card

//Delete Button - Delete Redux Action

//onChange - Edit Redux Action

//HTTP

//Save Button - Post Request





