import React, { useEffect, useState } from 'react';
import { fetchRequest } from '../../../../utils/fetchRequest';
import QuestionCard from '../questionCard/questionCard';

function Quiz() {

    const [questionList, setQuestionList] = useState();

    useEffect(() => {
        fetchRequest(`${process.env.REACT_APP_API_URL}questions/`)
            .then((result) => {
                if (result.ok) {
                    setQuestionList(result.data);
                }
                else {
                    history.push("/notfound");
                    console.log("no group data")
                }
            });
    }, [])

    return (
        <div>
            <h1>Questions</h1>
            <button>New Question</button>
            {
                questionList != null && questionList.count > 0 ?
                    questionList.map(question => <QuestionCard question={question} />)
                    :
                    <h4>No Questions Found</h4>
            }


        </div>
    )
}

export default Quiz;