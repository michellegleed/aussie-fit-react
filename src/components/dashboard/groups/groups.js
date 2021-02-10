import React, { useEffect, useState } from 'react';
import GroupCard from '../groupCard/groupCard';

import { fetchRequest } from '../../../utils/fetchRequest'
import GroupForm from '../groupForm/groupForm';

function Groups() {

    const [showGroupForm, setShowGroupForm] = useState(false);

    const [groupToEdit, setGroupToEdit] = useState();

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
            });
    }, [showGroupForm]);

    const editGroup = (groupID) => {
        setGroupToEdit(groupID);
        setShowGroupForm(true);
    }

    const displayGroupForm = (bool) => {
        setShowGroupForm(bool);
        // this clears group details from form upon closing
        bool === false ? setGroupToEdit(null) : null;
    }

    const populateGroupForm = () => {
        return groupToEdit ? groupList.filter(group => group.id == groupToEdit)[0] : { group_name: "" };
    }

    return (
        <div>
            <h1>Groups</h1>
            <button onClick={() => displayGroupForm(true)}>New Group</button>
            {
                groupList != null && groupList.length > 0 ?
                    groupList.map(group => <GroupCard group={group} editGroup={editGroup} />)
                    :
                    <h4>No groups found</h4>
            }
            {
                showGroupForm ?
                    <GroupForm displayGroupForm={displayGroupForm} group={populateGroupForm()} />
                    :
                    null
            }
        </div>
    )
}

export default Groups;