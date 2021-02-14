import React, { useEffect, useState } from 'react';
import { fetchRequest } from '../../../../utils/fetchRequest';
import QuestionCard from '../questionCard/questionCard';
import QuestionForm from '../questionForm/questionForm';

function Quiz() {

    const [questionList, setQuestionList] = useState();

    const [showQuestionForm, setShowQuestionForm] = useState(false);

    const [questionToEdit, setQuestionToEdit] = useState();

    const [saveUpdatesToAPI, setSaveUpdatesToAPI] = useState(0);

    useEffect(() => {
        fetchRequest(`${process.env.REACT_APP_API_URL}questions/`)
            .then((result) => {
                if (result.ok) {
                    setQuestionList(JSON.parse(result.data.questions))
                }
                else {
                    history.push("/notfound");
                    console.log("no group data")
                }
            });
    }, [])

    const displayQuestionForm = (bool) => {
        setShowQuestionForm(bool);
        bool === false ? setQuestionToEdit(null) : null;
    }

    const populateQuestionForm = () => {
        return questionToEdit ? questionList.filter(question => question.index == questionToEdit) : { question: "", yesAction: "None", noAction: "None", index: questionList.length };
    }

    const addQuestionToQuiz = (question) => {
        setQuestionList((prevState) => [
            ...prevState,
            question
        ]);

        setSaveUpdatesToAPI((prevState) => prevState + 1);
    }

    useEffect(() => {
        if (saveUpdatesToAPI > 0) {
            console.log("**** Sending PUT request to back-end ****")
            fetchRequest(`${process.env.REACT_APP_API_URL}questions/`, "PUT", { questions: JSON.stringify(questionList) })
                .then(result => {
                    console.log("result is", result)
                    if (result.ok) {
                        setQuestionList(JSON.parse(result.data.questions))
                    } else {
                        // the API returned an error - do something with it
                        console.error(data);
                        setErrorMessage("All fields are required.");
                    }
                })
                // .catch(error => history.push("/network-error"))
                .catch(error => console.log(error))
        }
    }, [saveUpdatesToAPI])

    return (
        <div>
            <h1>Questions</h1>
            <button onClick={() => displayQuestionForm(true)}>New Question</button>
            {
                showQuestionForm ?
                    <QuestionForm question={populateQuestionForm()} displayQuestionForm={displayQuestionForm} addQuestionToQuiz={addQuestionToQuiz} />
                    :
                    null
            }
            {
                questionList != null && questionList.length > 0 ?
                    questionList.map(question => <QuestionCard question={question} />)
                    :
                    <h4>No Questions Found</h4>
            }


        </div>
    )
}

export default Quiz;