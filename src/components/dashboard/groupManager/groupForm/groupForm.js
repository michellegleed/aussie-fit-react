import React, { useState, useEffect } from 'react';
import { fetchRequest } from '../../../../utils/fetchRequest';
import { useHistory } from 'react-router-dom';

import ErrorMessage from '../../../errorMessage/errorMessage';

function GroupForm(props) {

    const { group, displayGroupForm, refetchGroupList } = props;

    const [errorMessage, setErrorMessage] = useState();

    const [groupDetails, setGroupDetails] = useState({
        group_name: group.group_name
    });

    const history = useHistory();

    const handleChange = (e) => {
        const { id, value } = e.target;
        setGroupDetails((prevDetails) => ({
            ...prevDetails,
            [id]: value,
        }));
    }

    const postData = async () => {
        const result = fetchRequest(`${process.env.REACT_APP_API_URL}groups/`, "POST", groupDetails)
            .then(result => {
                console.log("result is", result)
                if (result.ok) {
                    displayGroupForm(false);
                    refetchGroupList();
                } else {
                    // the API returned an error - do something with it
                    console.error(data);
                    setErrorMessage("All fields are required.");
                }
            })
            // .catch(error => history.push("/network-error"))
            .catch(error => console.log(error))
    }

    const putData = async () => {
        const result = fetchRequest(`${process.env.REACT_APP_API_URL}groups/${group.id}/`, "PUT", groupDetails)
            .then(result => {
                console.log("result is", result)
                if (result.ok) {
                    displayGroupForm(false);
                    refetchGroupList();
                } else if (result.status == 400) {
                    // the API returned an error - do something with it
                    // console.error(data);
                    setErrorMessage("All fields are required.");
                }
            })
            // .catch(error => history.push("/network-error"))
            .catch(error => setErrorMessage(error.message))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        group.id ? putData() : postData()
    }

    return (
        <div>
            <form>
                <h1>{group.id ? `Edit ${group.group_name}` : "New Group"}</h1>
                <div className="error-message">
                    {
                        errorMessage ?
                            <ErrorMessage message={errorMessage} type="error" />
                            :
                            null
                    }
                </div>
                <button id="close-button" onClick={() => displayGroupForm(false)}>
                    <p>X</p>
                </button>
                <div className="form-item">
                    <label htmlFor="group_name">Group Name:</label>
                    <input
                        type="text"
                        id="group_name"
                        value={groupDetails.group_name}
                        onChange={handleChange}
                    />
                </div>

                <button type="submit" onClick={handleSubmit}>
                    Save
                </button>
            </form>
        </div>
    )
}

export default GroupForm;