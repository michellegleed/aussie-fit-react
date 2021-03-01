import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import PencilIcon from '../../components/icons/pencil';
import CloseIcon from '../../components/icons/close';

import { fetchRequest } from '../../utils/fetchRequest';
import ParticipantForm from '../../components/groupDetail/participantManager/participantForm/participantForm';
import EditAttendanceForm from '../../components/groupDetail/participantManager/editAttendanceForm/editAttendanceForm';


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
            fetchRequest(`${process.env.REACT_APP_API_URL}groups/${groupData.id}/`)
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
            return currentSession[0].title
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
                    <button onClick={() => displayParticipantForm(true)}><PencilIcon /></button>
                    <button onClick={() => deleteParticipant(participant.id)}><CloseIcon /></button>
                </div>
                <button onClick={() => displayEditAttendanceForm(true)}>Show Edit Attendance Form</button>
                <h4>{groupData.group_name}</h4>
                {
                    classList ?
                        <React.Fragment>
                            <h2>Attended:</h2>
                            {participantData.attended.map(session => <h4 key={`${session}-attended`}>{getSessionTitle(session)}</h4>)}
                            <h2>Absent:</h2>
                            {/* {participantData.absent.map(session => <h4>{session}</h4>)} */}
                            {participantData.absent.map(session => <h4 key={`${session}-absent`}>{getSessionTitle(session)}</h4>)}
                        </React.Fragment>
                        :
                        null
                }

            </div >
            :
            null
    )
}

export default ParticipantDetail;