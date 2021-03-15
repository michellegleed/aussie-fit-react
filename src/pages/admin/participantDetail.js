import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import PencilIcon from '../../components/icons/pencil';
import CloseIcon from '../../components/icons/close';

import { fetchRequest } from '../../utils/fetchRequest';
import ParticipantForm from '../../components/groupDetail/participantManager/participantForm/participantForm';
import EditAttendanceForm from '../../components/groupDetail/participantManager/editAttendanceForm/editAttendanceForm';
import CalendarIcon from '../../components/icons/calendar';


function ParticipantDetail() {

    const [participantData, setParticipantData] = useState();
    const [groupData, setGroupData] = useState();
    const [classList, setClassList] = useState();
    const [showParticipantForm, setShowParticipantForm] = useState(false);
    const [refetchParticipant, setRefetchParticipant] = useState(0);
    const [showEditAttendanceForm, setShowEditAttendanceForm] = useState(false);

    const { id } = useParams();
    const history = useHistory();

    useEffect(() => {
        fetchRequest(`${process.env.REACT_APP_API_URL}participants/${id}/`)
            .then((result) => {
                if (result.ok) {
                    setParticipantData(result.data.participant);
                    setGroupData(result.data.group);
                }
                else {
                    history.push("/notfound");
                    console.log("no participant data");
                }
            });
    }, [refetchParticipant]);

    useEffect(() => {
        groupData != null ?
            fetchRequest(`${process.env.REACT_APP_API_URL}classes/`)
                .then(result => {
                    console.log("result is", result)
                    if (result.ok) {
                        setClassList(result.data)
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
    }, [groupData]);

    const displayParticipantForm = (bool) => {
        setShowParticipantForm(bool);
    }

    const refetchParticipantData = () => {
        setRefetchParticipant((prevState) => prevState + 1);
    }

    const displayEditAttendanceForm = (bool) => {
        setShowEditAttendanceForm(bool);
    }

    const [deleteParticipantID, setDeleteParticipantID] = useState();

    const deleteParticipant = (participantID) => {
        setDeleteParticipantID(participantID);
    }

    const deleteData = () => {
        fetchRequest(`${process.env.REACT_APP_API_URL}participants/${participantData.id}/`, "DELETE")
            .then(result => {
                console.log("result is", result)
                if (result.ok) {
                    history.goBack();
                } else {
                    // the API returned an error - do something with it
                    console.error(data);
                    setErrorMessage("Error deleting participant.");
                }
            })
            // .catch(error => history.push("/network-error"))
            .catch(error => console.log(error))
    }

    const getSessionTitle = (classID) => {
        if (classList != null) {
            const currentSession = classList.filter(session => session.id === classID);
            return [currentSession[0].title, currentSession[0].time]
        }
    }

    return (
        participantData && groupData ?
            <div>
                {
                    showParticipantForm ?
                        <ParticipantForm groupID={groupData.id} participant={participantData} displayParticipantForm={displayParticipantForm} refetchParticipant={refetchParticipantData} />
                        :
                        null
                }
                {
                    showEditAttendanceForm ?
                        <EditAttendanceForm participant={participantData} classList={classList} displayEditAttendanceForm={displayEditAttendanceForm} refetchParticipant={refetchParticipantData} />
                        :
                        null
                }
                {
                    deleteParticipantID ?
                        <div className="modal">
                            <div className="modal-content">
                                <h4>Permanently delete {participantData.first_name} {participantData.last_name}?</h4>
                                <div className="centered-button-container">
                                    <button className="text-button" onClick={() => deleteData()}>OK</button>
                                    <button className="text-button" onClick={() => setDeleteParticipantID(null)}>Cancel</button>
                                </div>
                            </div>
                        </div>
                        :
                        null
                }
                <h1>{participantData.first_name} {participantData.last_name}</h1>
                <h2>{groupData.group_name}</h2>
                <div id="participant-detail-container">
                    <div className="icon-text-buttons">
                        <button onClick={() => displayEditAttendanceForm(true)}><CalendarIcon /><p>Update Attendance Record</p></button>
                        <button onClick={() => displayParticipantForm(true)}><PencilIcon /><p>Edit Participant Details</p></button>
                        <button onClick={() => deleteParticipant(participantData.id)}><CloseIcon /><p>Delete Participant</p></button>
                    </div>
                    {
                        classList ?
                            <div className="detail-container">
                                <div>
                                    <h4>Attended:</h4>
                                    {participantData.attended.map(session =>
                                        <div className="table-row class-item" key={`${session}-attended`}>
                                            <h5>{getSessionTitle(session)[0]}</h5>
                                            <p>{getSessionTitle(session)[1].slice(0, 10)}</p>
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <h4>Absent:</h4>
                                    {/* {participantData.absent.map(session => <h4>{session}</h4>)} */}
                                    {participantData.absent.map(session =>
                                        <div className="table-row class-item" key={`${session}-absent`}>
                                            <h5>{getSessionTitle(session)[0]}</h5>
                                            <p>{getSessionTitle(session)[1].slice(0, 10)}</p>
                                        </div>)}
                                </div>
                            </div>
                            :
                            null
                    }
                </div>
            </div>
            :
            null
    )
}

export default ParticipantDetail;