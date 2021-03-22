import React, { useEffect, useState } from 'react';
import Alert from '../../alert/alert';

import './question.css';

function Question(props) {

    const { question, nextQuestion } = props;

    const [message, setMessage] = useState(null);

    const [disableNext, setDisableNext] = useState(true);

    const [yesClicked, setYesClicked] = useState(false);
    const [noClicked, setNoClicked] = useState(false);

    const turnButtonYellow = (buttonName) => {
        if (buttonName === "yes") {
            setYesClicked(true);
            setNoClicked(false);
        }
        if (buttonName === "no") {
            setNoClicked(true);
            setYesClicked(false);
        }
    }

    const resetButtonColours = () => {
        setNoClicked(false);
        setYesClicked(false);
    }

    // reset whenever a new question is rendered
    useEffect(() => {
        setDisableNext(true);
        setMessage(null);
    }, [question])

    return (
        <div id="attendance-question">
            <h1>{question.question}</h1>
            { question.yesAction != "" || question.noAction != "" ?
                <React.Fragment>
                    <div className="centered-button-container">
                        <button className={`text-button answer-button ${yesClicked ? "active" : ""}`} onClick={() => {
                            question.yesAction != "" ? setMessage(question.yesAction) : setMessage(null);
                            turnButtonYellow("yes");
                            setDisableNext(false);
                        }
                        }>YES</button>
                        <button className={`text-button answer-button ${noClicked ? "active" : ""}`} onClick={() => {
                            question.noAction != "" ? setMessage(question.noAction) : setMessage(null);
                            turnButtonYellow("no");
                            setDisableNext(false);
                        }
                        }>NO</button>
                    </div>
                    {message != null ?
                        <Alert message={message} />
                        :
                        null
                    }
                    <div className="centered-button-container">
                        <button id="next-button" className={`text-button ${disableNext ? "disabled" : ""}`} disabled={disableNext} onClick={() => {
                            resetButtonColours();
                            nextQuestion();
                        }
                        }>Next</button>
                    </div>
                </React.Fragment>
                :
                null
            }
        </div>
    )
}

export default Question;