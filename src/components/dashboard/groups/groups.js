import React, { useEffect, useState } from 'react';
import GroupCard from '../groupCard/groupCard';

import { fetchRequest } from '../../../utils/fetchRequest'

function Groups() {

    const [groupList, setGroupList] = useState();

    useEffect(() => {
        fetchRequest(`${process.env.REACT_APP_API_URL}groups/`)
            .then((result) => {
                if (result.ok) {
                    setGroupList(result.data);
                }
                else {
                    history.push("/notfound");
                    console.log("no group data")
                }
            })
    }, []);

    return (
        <div>
            <h1>Groups</h1>
            <button>New Group</button>
            {
                groupList != null && groupList.length > 0 ?
                    groupList.map(group => <GroupCard group={group} />)
                    :
                    <h4>No groups found</h4>
            }

        </div>
    )

}

export default Groups;