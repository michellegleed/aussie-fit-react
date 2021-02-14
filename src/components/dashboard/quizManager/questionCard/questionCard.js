import React from 'react';

function QuestionCard(props) {

    const { question } = props;

    return (
        <div>
            <div>
                <button>Edit</button>
            </div>
            <p>{question.question}</p>
            <p>{question.yesAction}</p>
            <p>{question.noAction}</p>
        </div>
    )
}

export default QuestionCard;