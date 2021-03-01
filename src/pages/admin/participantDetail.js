import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import PencilIcon from '../../components/icons/pencil';
import CloseIcon from '../../components/icons/close';

import { fetchRequest } from '../../utils/fetchRequest';
import ParticipantForm from '../../components/groupDetail/participantManager/participantForm/participantForm';


function ParticipantDetail() {

    const [participantData, setParticipantData] = useState();
    const [groupData, setGroupData] = useState();
    const [showparticipantForm, setShowparticipantForm] = useState(false);
    const [refetchParticipants, setRefetchParticipants] = useState(0);

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
                    console.log("no participant data")
                }
            });
    }, [refetchParticipants]);

    const displayParticipantForm = (bool) => {
        setShowparticipantForm(bool);
    }

    const refetchParticipantList = () => {
        setRefetchParticipants((prevState) => prevState + 1)
    }

    return (
        participantData && groupData ?
            <div>
                {
                    showparticipantForm ?
                        <ParticipantForm groupID={groupData.id} participant={participantData} displayParticipantForm={displayParticipantForm} refetchParticipantList={refetchParticipantList} />
                        :
                        null
                }
                <h1>{participantData.first_name} {participantData.last_name}</h1>
                <div className="card-buttons edit-buttons">
                    <button onClick={() => displayParticipantForm(true)}><PencilIcon /></button>
                    <button onClick={() => deleteParticipant(participant.id)}><CloseIcon /></button>
                </div>
                <h4>{groupData.group_name}</h4>
                <h2>Attended:</h2>
                {participantData.attended.map(session => <h4>{session}</h4>)}
                <h2>Absent:</h2>
                {participantData.absent.map(session => <h4>{session}</h4>)}
            </div >
            :
            null
    )
}

export default ParticipantDetail;