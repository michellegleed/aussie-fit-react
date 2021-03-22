import React, { useEffect, useRef, useState } from 'react';
import { fetchRequest } from '../utils/fetchRequest';
import Question from '../components/attendance/question/question';
import Spinner from '../components/spinner/spinner';
import ErrorMessage from '../components/errorMessage/errorMessage';

function QuestionsPage() {

    const [index, setIndex] = useState(0);

    const [questions, setQuestions] = useState();

    const loadingRef = useRef(false);

    const [errorMessage, setErrorMessage] = useState();

    useEffect(() => {
        loadingRef.current = true;
        fetchRequest(`${process.env.REACT_APP_API_URL}questions/`)
            .then((result) => {
                loadingRef.current = false;
                if (result.ok) {
                    setQuestions(JSON.parse(result.data.questions))
                }
                else {
                    setErrorMessage("Something went wrong. Please refresh the page.")
                }
            });
    }, [])

    const completed = {
        question: "Sign In Complete",
        yesAction: "",
        noAction: ""
    }

    const incrementQuestionIndex = () => {
        setIndex(index + 1);
    }

    return (
        loadingRef.current == true ?
            <Spinner />
            :
            <React.Fragment>
                <div className="error-message">
                    {
                        errorMessage ?
                            <ErrorMessage message={errorMessage} type="error" />
                            :
                            null
                    }
                </div>
                {
                    questions != null && questions.length > 0 ?
                        <Question question={index < questions.length ? questions[index] : completed} nextQuestion={incrementQuestionIndex} />
                        :
                        null
                }
            </React.Fragment>
    )
}

export default QuestionsPage;