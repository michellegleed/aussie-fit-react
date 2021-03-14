import React from 'react';
import PlusIcon from '../../icons/plus';
import './plusButton.css';

const PlusButton = (props) => {
    return (
        <button className="plus-button" onClick={props.clickHandler}>
            <PlusIcon /><p>{props.buttonText}</p>
        </button>
    )
}

export default PlusButton;