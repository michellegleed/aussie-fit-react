import React, { useEffect, useState } from 'react';


import { fetchRequest } from '../../../../utils/fetchRequest'
import GroupForm from '../groupForm/groupForm';
import GroupCard from '../groupCard/groupCard';

function Groups() {

    const [showGroupForm, setShowGroupForm] = useState(false);

    const [groupToEdit, setGroupToEdit] = useState();

    const [refetchGroups, setrefetchGroups] = useState(0);

    const [groupList, setGroupList] = useState();

    useEffect(() => {
        fetchRequest(`${process.env.REACT_APP_API_URL}groups/`)
            .then((result) => {
                if (result.ok) {
                    setGroupList(result.data);
                }
                else {
                    console.log("no group data")
                }
            });
    }, [refetchGroups]);

    const refetchGroupList = () => {
        setrefetchGroups((prevState) => prevState + 1)
    }

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
            <div className="section-title">
                <h1>Groups</h1>
                <button onClick={() => displayGroupForm(true)}><img src="/icons/plus.svg" alt="New Group" /></button>
            </div>
            {
                groupList != null && groupList.length > 0 ?
                    groupList.map(group => <GroupCard group={group} editGroup={editGroup} refetchGroupList={refetchGroupList} />)
                    :
                    <h4>No groups found</h4>
            }
            {
                showGroupForm ?
                    <GroupForm displayGroupForm={displayGroupForm} group={populateGroupForm()} refetchGroupList={refetchGroupList} />
                    :
                    null
            }
        </div >
    )
}

export default Groups;