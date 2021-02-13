import React, { useEffect, useState } from 'react';
import Classes from '../../../components/groupDetail/classes/classes';

import { fetchRequest } from '../../../utils/fetchRequest'


function GroupDetail() {

    const [groupData, setGroupData] = useState();
    const groupID = 1;

    useEffect(() => {
        fetchRequest(`${process.env.REACT_APP_API_URL}groups/${groupID}`)
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
                < Classes classList={groupData.classes} />
                {/* <Participants /> */}
            </div >
            :
            null
    )
}

export default GroupDetail;