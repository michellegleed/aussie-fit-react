import React from 'react';

function QuestionCard(props) {

    const { question, index, editQuestion, deleteQuestion } = props;

    return (
        <div>
            <div>
                <button onClick={() => editQuestion(index)}>edit</button>
                <button onClick={() => deleteQuestion(index)}>X</button>
            </div>
            <p>{question.question}</p>
            <p>Yes: {question.yesAction != "" ? question.yesAction : "(No message)"}</p>
            <p>No: {question.noAction != "" ? question.noAction : "(No message)"}</p>
        </div>
    )
}

export default QuestionCard;