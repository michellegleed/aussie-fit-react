import React, { useEffect, useState } from 'react';
import { fetchRequest } from '../utils/fetchRequest';
import Question from '../components/attendance/question/question';

function QuestionsPage() {

    const [index, setIndex] = useState(0);

    const [questions, setQuestions] = useState();

    useEffect(() => {
        fetchRequest(`${process.env.REACT_APP_API_URL}questions/`)
            .then((result) => {
                if (result.ok) {
                    setQuestions(JSON.parse(result.data.questions))
                }
                else {
                    // history.push("/notfound");
                    console.log("no questions found")
                }
            });
    }, [])

    // const questions = [
    //     // # question = models.CharField(max_length=50)
    //     // # yes_action = models.CharField(max_length=50, blank=True)
    //     // # no_action = models.CharField(max_length=50, blank=True)
    //     // # index = models.IntegerField(blank=True)
    //     {
    //         question: "Is Evie a good dog?",
    //         yesAction: null,
    //         noAction: "Go see the dog trainer",
    //         index: 0
    //     },
    //     {
    //         question: "Does Evie smell like cornchips?",
    //         yesAction: "Take her for a bath",
    //         noAction: null,
    //         index: 1
    //     },
    //     {
    //         question: "Does Evie have bad breath?",
    //         yesAction: "Brush her teeth",
    //         noAction: null,
    //         index: 2
    //     },
    //     {
    //         question: "Is Evie snoring?",
    //         yesAction: null,
    //         noAction: "Take her for a walk",
    //         index: 3
    //     }
    // ]

    const completed = {
        question: "Sign In Complete",
        yesAction: "",
        noAction: ""
    }

    const incrementQuestionIndex = () => {
        setIndex(index + 1);
    }

    return (
        questions != null && questions.length > 0 ?
            <Question question={index < questions.length ? questions[index] : completed} nextQuestion={incrementQuestionIndex} />
            :
            null
    )
}

export default QuestionsPage;