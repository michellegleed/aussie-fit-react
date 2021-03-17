import React, { useEffect, useRef, seState } from 'react';
import { fetchRequest } from '../utils/fetchRequest';
import Question from '../components/attendance/question/question';
import Spinner from '../components/spinner/spinner';

function QuestionsPage() {

    const [index, setIndex] = useState(0);

    const [questions, setQuestions] = useState();

    const loadingRef = useRef(false);

    useEffect(() => {
        loadingRef.current = true;
        fetchRequest(`${process.env.REACT_APP_API_URL}questions/`)
            .then((result) => {
                loadingRef.current = false;
                if (result.ok) {
                    setQuestions(JSON.parse(result.data.questions))
                }
                else {
                    // history.push("/notfound");
                    console.log("no questions found")
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
            questions != null && questions.length > 0 ?
                <Question question={index < questions.length ? questions[index] : completed} nextQuestion={incrementQuestionIndex} />
                :
                null
    )
}

export default QuestionsPage;