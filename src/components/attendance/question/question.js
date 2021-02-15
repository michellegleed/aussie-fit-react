import React, { useEffect, useState } from 'react';
import Alert from '../../alert/alert';

function Question(props) {

    const { question, nextQuestion } = props;

    const [message, setMessage] = useState(null);

    const [disableNext, setDisableNext] = useState(true);

    // reset whenever a new question is rendered
    useEffect(() => {
        setDisableNext(true);
        setMessage(null);
    }, [question])

    return (
        <div>
            <h1>{question.question}</h1>
            { question.yesAction != "" || question.noAction != "" ?
                <React.Fragment>
                    <div>
                        <button onClick={() => {
                            question.yesAction != "" ? setMessage(question.yesAction) : setMessage(null);
                            setDisableNext(false);
                        }
                        }>Yes</button>
                        <button onClick={() => {
                            question.noAction != "" ? setMessage(question.noAction) : setMessage(null);
                            setDisableNext(false);
                        }
                        }>No</button>
                    </div>
                    {message != null ?
                        <Alert message={message} />
                        :
                        null
                    }
                    <button disabled={disableNext} onClick={() => nextQuestion()}>Next</button>
                </React.Fragment>
                :
                null
            }
        </div>
    )
}

export default Question;