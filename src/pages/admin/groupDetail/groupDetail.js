import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Classes from '../../../components/groupDetail/classManager/classes/classes';
import Participants from '../../../components/groupDetail/participantManager/participants/participants';

import { fetchRequest } from '../../../utils/fetchRequest';


function GroupDetail() {

    const [groupData, setGroupData] = useState();

    const { id } = useParams();

    useEffect(() => {
        fetchRequest(`${process.env.REACT_APP_API_URL}groups/${id}/`)
            .then((result) => {
                if (result.ok) {
                    setGroupData(result.data);
                }
                else {
                    history.push("/notfound");
                    console.log("no group data")
                }
            });
    }, []);

    return (
        groupData ?
            <div>
                <h1>{groupData.group_name}</h1>
                < Classes group={id} />
                <Participants group={id} />
            </div >
            :
            null
    )
}

export default GroupDetail;