import React, { useState } from 'react';
import CloseIcon from '../../../icons/close';
import PencilIcon from '../../../icons/pencil';

function QuestionCard(props) {

    const { question, index, editQuestion, deleteQuestion } = props;

    return (
        <div className="card">
            <div className="card-buttons">
                <button onClick={() => editQuestion(index)}><PencilIcon /></button>
                <button onClick={() => deleteQuestion(index)}><CloseIcon /></button>
            </div>
            <h4>{question.question}</h4>
            <p>Yes: {question.yesAction != "" ? question.yesAction : "(No message)"}</p>
            <p>No: {question.noAction != "" ? question.noAction : "(No message)"}</p>
        </div>
    )
}

export default QuestionCard;