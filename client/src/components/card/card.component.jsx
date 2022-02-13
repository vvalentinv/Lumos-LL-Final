import './card.styles.scss';

import { connect } from 'react-redux';

const saveCard = () => {

}


const Card = () => {
    return (
        <div className='card-container'>
            <div className='card-toolbar'>
                <span>Flash Card ID</span>
                <div className='card-input-container'>
                    <input
                        className='input-question'
                        placeholder='Enter question'>

                    </input>
                    <input
                        className='input-answer'
                        placeholder='Enter answer'>
                    </input>
                </div>
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





