import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Classes from '../../components/groupDetail/classManager/classes/classes';
import Participants from '../../components/groupDetail/participantManager/participants/participants';

import { fetchRequest } from '../../utils/fetchRequest';


function ParticipantDetail() {

    const [participantData, setParticipantData] = useState();

    const { id } = useParams();

    useEffect(() => {
        fetchRequest(`${process.env.REACT_APP_API_URL}participants/${id}/`)
            .then((result) => {
                if (result.ok) {
                    setParticipantData(result.data);
                }
                else {
                    history.push("/notfound");
                    console.log("no participant data")
                }
            });
    }, []);

    return (
        participantData ?
            <div>
                <h1>{participantData.first_name}</h1>
            </div >
            :
            null
    )
}

export default ParticipantDetail;