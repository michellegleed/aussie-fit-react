import React, { useState } from 'react';
import Question from '../components/attendance/question/question';

function QuestionsPage() {

    const [index, setIndex] = useState(0);

    // const questions = [
    //     {
    //         q: "Have you weighed in?",
    //         y: null,
    //         n: "See Brendan"
    //     },
    //     {
    //         q: "Do you have any injuries today?",
    //         y: "See Exercise Physiologist",
    //         n: null
    //     }
    // ]

    const questions = [
        // # question = models.CharField(max_length=50)
        // # yes_action = models.CharField(max_length=50, blank=True)
        // # no_action = models.CharField(max_length=50, blank=True)
        // # index = models.IntegerField(blank=True)
        {
            question: "Is Evie a good dog?",
            yesAction: null,
            noAction: "Go see the dog trainer",
            index: 0
        },
        {
            question: "Does Evie smell like cornchips?",
            yesAction: "Take her for a bath",
            noAction: null,
            index: 1
        },
        {
            question: "Does Evie have bad breath?",
            yesAction: "Brush her teeth",
            noAction: null,
            index: 2
        },
        {
            question: "Is Evie snoring?",
            yesAction: null,
            noAction: "Take her for a walk",
            index: 3
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