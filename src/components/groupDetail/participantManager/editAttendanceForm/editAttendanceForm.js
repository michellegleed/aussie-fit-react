import React, { useState, useEffect } from 'react';
import { fetchRequest } from '../../../../utils/fetchRequest';
import { useHistory } from 'react-router-dom';
import Datetime from 'react-datetime';

import ErrorMessage from '../../../errorMessage/errorMessage';
import CloseIcon from '../../../icons/close';

function EditAttendanceForm(props) {

    const { group, participant, displayEditAttendanceForm, refetchParticipant } = props;

    const [errorMessage, setErrorMessage] = useState();

    const [classList, setClassList] = useState();
    const [attended, setAttended] = useState(participant.attended);
    const [absent, setAbsent] = useState(participant.absent);

    const history = useHistory();

    const handleChange = (e) => {
        console.log(e);
        const { name, value } = e.target;
        const sessionID = parseInt(name);
        if (value === "true") {
            if (!attended.includes(sessionID)) {
                setAttended((prevState) => ([
                    ...prevState,
                    sessionID,
                ]));
            }
            let absentArray = Array.from(absent);
            const index = absentArray.indexOf(sessionID);
            absentArray.splice(index, 1)
            setAbsent(absentArray);
        } else if (value === "false") {
            if (!absent.includes(sessionID)) {
                setAbsent((prevState) => ([
                    ...prevState,
                    sessionID,
                ]));
            }
            let attendedArray = Array.from(attended);
            const index = attendedArray.indexOf(sessionID);
            attendedArray.splice(index, 1)
            setAttended(attendedArray);
        }
    }

    const handleDate = (date) => {
        setClassDetails((prevDetails) => ({
            ...prevDetails,
            time: date,
        }));
    }

    useEffect(() => {
        fetchRequest(`${process.env.REACT_APP_API_URL}groups/${participant.group}/`)
            .then(result => {
                console.log("result is", result)
                if (result.ok) {
                    setClassList(result.data.classes)
                } else if (result.status == 400) {
                    // the API returned an error - do something with it
                    // console.error(data);
                    setErrorMessage("No classes found for participant's group.");
                }
            })
            // .catch(error => history.push("/network-error"))
            .catch(error => setErrorMessage(error.message))
    }, []);

    const putData = async () => {
        const attendanceDetails = {
            attended: attended,
            absent: absent
        };
        fetchRequest(`${process.env.REACT_APP_API_URL}participants/${participant.id}/`, "PUT", attendanceDetails)
            .then(result => {
                if (result.ok) {
                    displayEditAttendanceForm(false);
                    refetchParticipant();
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
        putData();
    }

    return (
        <div className="modal">
            <form>
                <h1>Edit Attendance Record</h1>
                <div className="error-message">
                    {
                        errorMessage ?
                            <ErrorMessage message={errorMessage} type="error" />
                            :
                            null
                    }
                </div>
                <button id="close-button" onClick={() => displayAttendanceForm(false)}>
                    <CloseIcon />
                </button>
                {
                    classList != null ?
                        classList.map(session => <div className="form-item" key={session.id} onChange={handleChange}>
                            <h4>{session.title}</h4>
                            <input
                                type="radio"
                                name={session.id}
                                id={`${session.id}-true`}
                                value={true}
                                // onChange={handleChange}
                                checked={attended.includes(session.id)}
                            />
                            <label htmlFor="attended">Attended</label>
                            <input
                                type="radio"
                                name={session.id}
                                id={`${session.id}-false`}
                                value={false}
                                // onChange={handleChange}
                                checked={absent.includes(session.id)}
                            />
                            <label htmlFor="absent">Absent</label>
                        </div>)
                        :
                        null
                }

                <button type="submit" onClick={handleSubmit}>
                    Save
                </button>
            </form>
        </div>
    )
}

export default EditAttendanceForm;