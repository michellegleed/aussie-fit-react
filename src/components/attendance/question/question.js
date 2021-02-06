import React, { useEffect, useState } from 'react';
import Alert from '../../alert/alert';

function Question(props) {

    const { question, nextQuestion } = props;

    const [message, setMessage] = useState(null);

    const [disableNext, setDisableNext] = useState(true);

    // reset whenever a new question is rendered
    useEffect(() => {
        setDisableNext(true);
        setMessage();
    }, [question])

    return (
        <div>
            <h1>{question.q}</h1>
            { question.y != null || question.n != null ?
                <React.Fragment>
                    <div>
                        <button onClick={() => {
                            question.y != null ? setMessage(question.y) : setMessage(null);
                            setDisableNext(false);
                        }
                        }>Yes</button>
                        <button onClick={() => {
                            question.n != null ? setMessage(question.n) : setMessage(null);
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