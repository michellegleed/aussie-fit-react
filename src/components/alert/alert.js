import React from 'react';

function Alert(props) {
    const { message } = props;
    return (
        <div>
            <h6>{message}</h6>
        </div>
    )
}

export default Alert;