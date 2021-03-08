import React from 'react';

import './alert.css';

function Alert(props) {
    const { message } = props;
    return (
        <div>
            <h6 id="alert">{message}</h6>
        </div>
    )
}

export default Alert;