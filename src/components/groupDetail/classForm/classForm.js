import React, { useState, useEffect } from 'react';
import { fetchRequest } from '../../../utils/fetchRequest';
import { useHistory } from 'react-router-dom';
import Datetime from 'react-datetime';

// import ErrorMessage from '../../ErrorMessage/ErrorMessage';

function ClassForm(props) {

    const { session, displayClassForm, refetchClassList } = props;

    // const [errorMessage, setErrorMessage] = useState();

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
        setClassDetails((prevDetails) => ({
            ...prevDetails,
            time: date,
        }));
    }

    const postData = async () => {
        const result = fetchRequest(`${process.env.REACT_APP_API_URL}classes/`, "POST", classDetails)
            .then(result => {
                console.log("result is", result)
                if (result.ok) {
                    displayClassForm(false);
                    refetchClassList();
                } else {
                    // the API returned an error - do something with it
                    console.error(data);
                    setErrorMessage("All fields are required.");
                }
            })
            // .catch(error => history.push("/network-error"))
            .catch(error => console.log(error))
    }

    const putData = async () => {
        const result = fetchRequest(`${process.env.REACT_APP_API_URL}classes/${session.id}/`, "PUT", classDetails)
            .then(result => {
                console.log("result is", result)
                if (result.ok) {
                    displayClassForm(false);
                    refetchClassList();
                } else {
                    // the API returned an error - do something with it
                    console.error(data);
                    setErrorMessage("All fields are required.");
                }
            })
            // .catch(error => history.push("/network-error"))
            .catch(error => console.log(error))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        session.id ? putData() : postData()
    }

    return (
        <div>
            <form>
                <h1>New Class</h1>
                {/* <div className="error-message">
                    {
                        errorMessage ?
                            <ErrorMessage message={errorMessage} type="error" />
                            :
                            null
                    }
                </div> */}
                <button id="close-button" onClick={() => displayClassForm(false)}>
                    <p>X</p>
                </button>
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
                    <Datetime value={classDetails.time} onChange={handleDate} id="time" />
                </div>


                <button type="submit" onClick={handleSubmit}>
                    Save
                </button>
            </form>
        </div>
    )
}

export default ClassForm;