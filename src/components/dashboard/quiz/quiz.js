import React from 'react';
import QuestionCard from '../questionCard/questionCard';

function Quiz() {
    return (
        <div>
            <h1>Questions</h1>
            <button>New Question</button>
            <QuestionCard />
        </div>
    )
}

export default Quiz;