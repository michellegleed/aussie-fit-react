import React from 'react';

import './errorMessage.css';

function ErrorMessage(props) {

    // destructuring the props
    const { message, type } = props;

    const getIcon = () => {
        switch (type) {
            case "warning": return "fas fa-exclamation-circle"
            case "error": return "fas fa-skull-crossbones"
        }
    }

    return (
        <div className="error-message">
            <p>
                <i class={getIcon()}></i>{message}</p>
        </div>
    );
}

export default ErrorMessage;