import React, { useEffect, useState } from 'react';
import GroupCard from '../groupCard/groupCard';

import { fetchRequest } from '../../../utils/fetchRequest'
import NewGroupForm from './newGroup';

function Groups() {

    const [showNewGroupForm, setShowNewGroupForm] = useState(false);
    const [groupList, setGroupList] = useState();

    useEffect(() => {
        getGroupList();
    }, [showNewGroupForm]);

    const getGroupList = () => {
        fetchRequest(`${process.env.REACT_APP_API_URL}groups/`)
            .then((result) => {
                if (result.ok) {
                    setGroupList(result.data);
                }
                else {
                    history.push("/notfound");
                    console.log("no group data")
                }
            });
    }

    const displayNewGroupForm = (bool) => {
        setShowNewGroupForm(bool);
    }

    return (
        <div>
            <h1>Groups</h1>
            <button onClick={() => displayNewGroupForm(true)}>New Group</button>
            {
                groupList != null && groupList.length > 0 ?
                    groupList.map(group => <GroupCard group={group} />)
                    // groupList.map(group => <GroupCard group={group} />)
                    :
                    <h4>No groups found</h4>
            }
            {
                showNewGroupForm ?
                    <NewGroupForm updateGroupList={getGroupList} displayNewGroupForm={displayNewGroupForm} />
                    :
                    null
            }

        </div>
    )

}

export default Groups;