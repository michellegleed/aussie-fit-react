import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Moment from 'react-moment';
import { fetchRequest } from '../../../../utils/fetchRequest';

function GroupCard(props) {

    const history = useHistory();

    const { group, editGroup, refetchGroupList } = props;

    const [deleteGroupID, setDeleteGroupID] = useState();

    const deleteGroup = (groupID) => {
        setDeleteGroupID(groupID);
    }

    const deleteData = () => {
        fetchRequest(`${process.env.REACT_APP_API_URL}groups/${group.id}/`, "DELETE")
            .then(result => {
                console.log("result is", result)
                if (result.ok) {
                    refetchGroupList();
                    console.log("successfully deleted something!")
                } else {
                    // the API returned an error - do something with it
                    console.error(data);
                    setErrorMessage("All fields are required.");
                }
            })
            // .catch(error => history.push("/network-error"))
            .catch(error => console.log(error))
    }

    return (
        <React.Fragment>
            {
                deleteGroupID ?
                    <div>
                        <h4>Permanently delete {group.group_name}?</h4>
                        <button onClick={() => deleteData()}>OK</button>
                        <button onClick={() => setDeleteGroupID(null)}>Cancel</button>
                    </div>
                    :
                    null
            }
            <div>
                <div>
                    <h2>{group.group_name}</h2>
                    <p>{group.number_of_participants}</p>
                </div>
                <div>
                    <button onClick={() => editGroup(group.id)}>edit</button>
                    <button onClick={() => deleteGroup(group.id)}>X</button>
                </div>
                <p>Next Session:</p>
                {
                    group.next_class != null ?
                        <p><Moment format="DD/MM/YY">{group.next_class.time}</Moment> @ <Moment format="h:mma">{group.next_class.time}</Moment></p>
                        :
                        <h4>No upcoming classes</h4>
                }

            </div>
        </React.Fragment>
    )
}

export default GroupCard;