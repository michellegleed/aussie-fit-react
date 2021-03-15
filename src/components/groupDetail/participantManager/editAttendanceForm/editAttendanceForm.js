import React, { useState, useEffect } from 'react';
import { fetchRequest } from '../../../../utils/fetchRequest';
import { useHistory } from 'react-router-dom';
import Datetime from 'react-datetime';

import ErrorMessage from '../../../errorMessage/errorMessage';
import CloseIcon from '../../../icons/close';
import participantForm from '../participantForm/participantForm';

import './editAttendanceForm.css';
import CloseButton from '../../../buttons/closeButton/closeButton';

function EditAttendanceForm(props) {

    const { participant, displayEditAttendanceForm, refetchParticipant } = props;

    const [errorMessage, setErrorMessage] = useState();

    const [classList, setClassList] = useState();
    const [attended, setAttended] = useState(participant.attended);
    const [absent, setAbsent] = useState(participant.absent);

    useEffect(() => {
        participant != null ?
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
            :
            null
    }, [participant]);

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
            <form id="edit-attendance-form">
                {/* <button id="close-button" onClick={() => displayAttendanceForm(false)}>
                    <CloseIcon />
                </button> */}
                <CloseButton clickHandler={() => displayAttendanceForm(false)} />
                <h1>Edit {participant.first_name} {participant.last_name}'s Attendance</h1>
                <div className="error-message">
                    {
                        errorMessage ?
                            <ErrorMessage message={errorMessage} type="error" />
                            :
                            null
                    }
                </div>
                {
                    classList != null && classList.length > 0 ?
                        <div id="form-attendance-list">
                            {classList.map(session => <div className="form-item" key={session.id}>
                                <h4>{session.title}</h4>
                                <input
                                    type="radio"
                                    name={session.id}
                                    id={`${session.id}-true`}
                                    value={true}
                                    onChange={handleChange}
                                    checked={attended.includes(session.id)}
                                />
                                <label htmlFor="attended">Attended</label>
                                <input
                                    type="radio"
                                    name={session.id}
                                    id={`${session.id}-false`}
                                    value={false}
                                    onChange={handleChange}
                                    checked={absent.includes(session.id)}
                                />
                                <label htmlFor="absent">Absent</label>
                            </div>)}
                        </div>
                        :
                        <h4>No classes found for this participant's group.</h4>
                }

                <div className="centered-button-container">
                    <button className="text-button" type="submit" onClick={handleSubmit}>
                        Save
                </button>
                </div>
            </form>
        </div>
    )
}

export default EditAttendanceForm;