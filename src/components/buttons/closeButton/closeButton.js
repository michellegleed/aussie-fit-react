import React from 'react';
import CloseIcon from '../../icons/close';
import './closeButton.css';

const CloseButton = (props) => {
    return (
        <div className="close-button-container">
            <button className="close-button" onClick={props.clickHandler}>
                <CloseIcon />
            </button>
        </div>
    )
}

export default CloseButton;