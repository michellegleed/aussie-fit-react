import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

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
                <h1>{participantData.first_name} {participantData.last_name}</h1>
                <div className="card-buttons edit-buttons">
                    <button onClick={() => displayEditAttendanceForm(true)}><CalendarIcon /></button>
                    <button onClick={() => displayParticipantForm(true)}><PencilIcon /></button>
                    <button onClick={() => deleteParticipant(participant.id)}><CloseIcon /></button>
                </div>
                <h2>{groupData.group_name}</h2>
                {
                    classList ?
                        <div className="detail-container">
                            <div>
                                <h4>Attended:</h4>
                                {participantData.attended.map(session =>
                                    <div className="class-item" key={`${session}-attended`}>
                                        <h5>{getSessionTitle(session)[0]}</h5>
                                        <p>{getSessionTitle(session)[1].slice(0, 10)}</p>
                                    </div>
                                )}
                            </div>
                            <div>
                                <h4>Absent:</h4>
                                {/* {participantData.absent.map(session => <h4>{session}</h4>)} */}
                                {participantData.absent.map(session =>
                                    <div className="class-item" key={`${session}-absent`}>
                                        <h5>{getSessionTitle(session)[0]}</h5>
                                        <p>{getSessionTitle(session)[1].slice(0, 10)}</p>
                                    </div>)}
                            </div>
                        </div>
                        :
                        null
                }

            </div >
            :
            null
    )
}

export default ParticipantDetail;