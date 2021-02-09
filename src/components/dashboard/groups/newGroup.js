import React, { useState, useEffect } from 'react';
import { fetchRequest } from '../../../utils/fetchRequest';
import { useHistory } from 'react-router-dom';

// import ErrorMessage from '../../ErrorMessage/ErrorMessage';

function NewGroupForm(props) {

    const { updateGroupList, displayNewGroupForm } = props;

    // const [errorMessage, setErrorMessage] = useState();

    const [groupDetails, setGroupDetails] = useState({
        group_name: ""
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
        return result;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        postData()
            .then(result => {
                console.log("result is", result)
                if (result.ok) {
                    displayNewGroupForm(false);
                } else {
                    // the API returned an error - do something with it
                    console.error(data);
                    setErrorMessage("All fields are required.");
                }
            })
            .catch(error => history.push("/network-error"))
    }

    return (
        <div>
            <form>
                <h1>New Group</h1>
                {/* <div className="error-message">
                    {
                        errorMessage ?
                            <ErrorMessage message={errorMessage} type="error" />
                            :
                            null
                    }
                </div> */}
                <button id="close-button" onClick={() => displayNewGroupForm(false)}>
                    <p>X</p>
                </button>
                <div className="form-item">
                    <label htmlFor="group_name">Group Name:</label>
                    <input
                        type="text"
                        id="group_name"
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

export default NewGroupForm;