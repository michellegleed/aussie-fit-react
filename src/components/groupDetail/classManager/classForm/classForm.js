import React, { useState, useEffect } from 'react';
import { fetchRequest } from '../../../../utils/fetchRequest';
import { useHistory } from 'react-router-dom';
import Datetime from 'react-datetime';

import ErrorMessage from '../../../errorMessage/errorMessage';
import CloseIcon from '../../../icons/close';
import CloseButton from '../../../buttons/closeButton/closeButton';

function ClassForm(props) {

    const { session, displayClassForm, refetchClassList } = props;

    const [errorMessage, setErrorMessage] = useState();

    const [classDetails, setClassDetails] = useState({
        title: session.title,
        group: session.group, // for New Class, need to get group ID from params!!!
        time: session.time
    });

    const history = useHistory();

    const handleChange = (e) => {
        const { id, value } = e.target;
        setClassDetails((prevDetails) => ({
            ...prevDetails,
            [id]: value,
        }));
    }

    const handleDate = (date) => {
        if (session.in_progress || session.is_finished) {
            // setErrorMessage(" This change will not be saved. Either delete this class or contact administrator.")
            // return;
        }
        // setErrorMessage(null);
        setClassDetails((prevDetails) => ({
            ...prevDetails,
            time: date,
        }));
    }

    const postData = async () => {
        fetchRequest(`${process.env.REACT_APP_API_URL}classes/`, "POST", classDetails)
            .then(result => {
                console.log("result is", result)
                if (result.ok) {
                    displayClassForm(false);
                    refetchClassList();
                } else if (result.status == 400) {
                    // the API returned an error - do something with it
                    // console.error(data);
                    setErrorMessage("All fields are required.");
                }
            })
            // .catch(error => history.push("/network-error"))
            .catch(error => setErrorMessage(error.message))
    }

    const putData = async () => {
        fetchRequest(`${process.env.REACT_APP_API_URL}classes/${session.id}/`, "PUT", classDetails)
            .then(result => {
                console.log("result is", result)
                if (result.ok) {
                    displayClassForm(false);
                    refetchClassList();
                } else if (result.status == 400) {
                    // the API returned an error - do something with it
                    // console.error(data);
                    setErrorMessage("All fields are required.");
                }
            })
            // .catch(error => history.push("/network-error"))
            .catch(error => setErrorMessage(error.message))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        session.id ? putData() : postData()
    }

    return (
        <div className="modal">
            <form>
                <CloseButton clickHandler={() => displayClassForm(false)} />
                <h1>{session.id ? "Edit Class" : "New Class"}</h1>
                <div className="error-message">
                    {
                        errorMessage ?
                            <ErrorMessage message={errorMessage} type="error" />
                            :
                            null
                    }
                </div>
                <div className="form-input-fields">
                    <div className="form-item">
                        <label htmlFor="title">Title:</label>
                        <input
                            type="text"
                            id="title"
                            value={classDetails.title}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-item">
                        <label htmlFor="time">Time:</label>
                        {
                            session.in_progress || session.is_finished ?
                                <h4>Cannot change the time of a class that has finished or is in progress.</h4>
                                :
                                <Datetime value={classDetails.time} onChange={handleDate} id="time" />
                        }
                    </div>
                </div>

                <div className="centered-button-container">
                    <button className="text-button" type="submit" onClick={handleSubmit}>
                        Save
                </button>
                </div>
            </form>
        </div >
    )
}

export default ClassForm;