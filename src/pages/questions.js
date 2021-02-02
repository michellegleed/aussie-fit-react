import React, { useState } from 'react';
import Question from '../components/attendance/question/question';

function QuestionsPage() {

    const [index, setIndex] = useState(0);

    const questions = [
        {
            q: "Have you weighed in?",
            y: null,
            n: "See Brendan"
        },
        {
            q: "Do you have any injuries today?",
            y: "See Exercise Physiologist",
            n: null
        }
    ]

    const completed = {
        q: "Sign In Complete",
        y: null,
        n: null
    }

    const incrementQuestionIndex = () => {
        setIndex(index + 1);
    }

    return (
        <Question question={index < questions.length ? questions[index] : completed} nextQuestion={incrementQuestionIndex} />
    )
}

export default QuestionsPage;