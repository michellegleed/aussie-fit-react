import React, { useEffect, useRef, useState } from 'react';
import { fetchRequest } from '../../../../utils/fetchRequest'
import GroupForm from '../groupForm/groupForm';
import GroupCard from '../groupCard/groupCard';
import PlusButton from '../../../buttons/plusButton/plusButton';
import Spinner from '../../../spinner/spinner';
import ErrorMessage from '../../../errorMessage/errorMessage';

function Groups(props) {

    const { redirectToLogin } = props;

    const [showGroupForm, setShowGroupForm] = useState(false);

    const [groupToEdit, setGroupToEdit] = useState();

    const [refetchGroups, setrefetchGroups] = useState(0);

    const [groupList, setGroupList] = useState();

    const [errorMessage, setErrorMessage] = useState();

    const loadingRef = useRef(false);

    useEffect(() => {
        loadingRef.current = true;
        fetchRequest(`${process.env.REACT_APP_API_URL}groups/`)
            .then((result) => {
                loadingRef.current = false;
                if (result.ok) {
                    setGroupList(result.data);
                }
                else if (result.status == 401) {
                    redirectToLogin();
                }
                else {
                    setErrorMessage("Could not access group data. Refresh the page to try again.")
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
        if (bool === false) {
            setGroupToEdit(null)
        }
    }

    const populateGroupForm = () => {
        return groupToEdit ? groupList.filter(group => group.id == groupToEdit)[0] : { group_name: "" };
    }

    return (
        <div id="group-section">
            <div className="error-message">
                {
                    errorMessage ?
                        <ErrorMessage message={errorMessage} type="error" />
                        :
                        null
                }
            </div>
            <div className="section-title">
                <h1>Groups</h1>
                {/* <button onClick={() => displayGroupForm(true)}><PlusIcon /></button> */}
                <PlusButton clickHandler={() => displayGroupForm(true)} buttonText="New Group" />
            </div>
            <div className="card-container">
                {
                    groupList != null && groupList.length > 0 ?
                        groupList.map(group => <GroupCard key={group.id} group={group} editGroup={editGroup} refetchGroupList={refetchGroupList} />)
                        :
                        loadingRef.current === true ?
                            <Spinner />
                            :
                            <h4>No groups found</h4>
                }
            </div>
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