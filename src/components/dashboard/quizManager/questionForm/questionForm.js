import React, { useState, useEffect } from 'react';
import { fetchRequest } from '../../../../utils/fetchRequest';
import { useHistory } from 'react-router-dom';

// import ErrorMessage from '../../ErrorMessage/ErrorMessage';

function QuestionForm(props) {

    const { question, displayQuestionForm, addQuestionToQuiz } = props;

    // const [errorMessage, setErrorMessage] = useState();

    const [questionDetails, setQuestionDetails] = useState({
        question: question.question,
        yesAction: question.yesAction,
        noAction: question.noAction,
        index: question.index
    });

    // const history = useHistory();

    const handleChange = (e) => {
        const { id, value } = e.target;
        setQuestionDetails((prevDetails) => ({
            ...prevDetails,
            [id]: value,
        }));
    }

    // const putData = async () => {
    //     const result = fetchRequest(`${process.env.REACT_APP_API_URL}questions/${question.id}/`, "PUT", questionDetails)
    //         .then(result => {
    //             console.log("result is", result)
    //             if (result.ok) {
    //                 displayQuestionForm(false);
    //                 refetchQuestionList();
    //             } else {
    //                 // the API returned an error - do something with it
    //                 console.error(data);
    //                 setErrorMessage("All fields are required.");
    //             }
    //         })
    //         // .catch(error => history.push("/network-error"))
    //         .catch(error => console.log(error))
    // }

    const handleSubmit = (e) => {
        e.preventDefault();
        // question.id ? putData() : postData()
        addQuestionToQuiz(questionDetails);
        displayQuestionForm(false);
    }

    return (
        <div>
            <form>
                <h1>New Question</h1>
                {/* <div className="error-message">
                    {
                        errorMessage ?
                            <ErrorMessage message={errorMessage} type="error" />
                            :
                            null
                    }
                </div> */}
                <button id="close-button" onClick={() => displayQuestionForm(false)}>
                    <p>X</p>
                </button>
                <div className="form-item">
                    <label htmlFor="question">Question Name:</label>
                    <input
                        type="text"
                        id="question"
                        value={questionDetails.question}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-item">
                    <label htmlFor="yesAction">"Yes" Message:</label>
                    <input
                        type="text"
                        id="yesAction"
                        value={questionDetails.yesAction}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-item">
                    <label htmlFor="noAction">"No" Message:</label>
                    <input
                        type="text"
                        id="noAction"
                        value={questionDetails.noAction}
                        onChange={handleChange}
                    />
                </div>

                <button type="submit" onClick={handleSubmit}>
                    Save
                </button>
            </form>
        </div>
    )
}

export default QuestionForm;