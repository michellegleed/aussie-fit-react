import React, { useState, useEffect } from 'react';
import { fetchRequest } from '../../../../utils/fetchRequest';
import { useHistory } from 'react-router-dom';
import Datetime from 'react-datetime';

// import ErrorMessage from '../../ErrorMessage/ErrorMessage';

function participantForm(props) {

    const { groupID, participant, displayParticipantForm, refetchParticipantList } = props;

    // const [errorMessage, setErrorMessage] = useState();

    const [groupList, setGroupList] = useState();

    const [participantDetails, setParticipantDetails] = useState({
        first_name: participant.first_name,
        last_name: participant.last_name,
        group: participant.group, // for New participant, need to get group ID from params!!!
    });

    const history = useHistory();

    useEffect(() => {
        fetchRequest(`${process.env.REACT_APP_API_URL}groups/`)
            .then((result) => {
                if (result.ok) {
                    setGroupList(result.data);
                }
                else {
                    // history.push("/notfound");
                    console.log("no group list found")
                }
            });
    }, []);

    const checkIfCurrentlySelected = (group) => {
        if (group.id == groupID) {
            return <option value={group.id} selected>{group.group_name}</option>
        }
        return <option value={group.id}>{group.group_name}</option>
    }

    const handleChange = (e) => {
        const { id, value } = e.target;
        setParticipantDetails((prevDetails) => ({
            ...prevDetails,
            [id]: value,
        }));
    }

    const handleDate = (date) => {
        setParticipantDetails((prevDetails) => ({
            ...prevDetails,
            time: date,
        }));
    }

    const postData = async () => {
        fetchRequest(`${process.env.REACT_APP_API_URL}participants/`, "POST", participantDetails)
            .then(result => {
                console.log("result is", result)
                if (result.ok) {
                    displayParticipantForm(false);
                    refetchParticipantList();
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
        fetchRequest(`${process.env.REACT_APP_API_URL}participants/${participant.id}/`, "PUT", participantDetails)
            .then(result => {
                console.log("result is", result)
                if (result.ok) {
                    displayParticipantForm(false);
                    refetchParticipantList();
                } else {
                    // the API returned an error - do something with it
                    console.error(data);
                    setErrorMessage("All fields are required.");
                }
            })
            // .catch(error => history.push("/network-error"))
            .catch(error => console.log(error))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        participant.id ? putData() : postData()
    }

    return (
        <div>
            <form>
                <h1>New participant</h1>
                {/* <div participantName="error-message">
                    {
                        errorMessage ?
                            <ErrorMessage message={errorMessage} type="error" />
                            :
                            null
                    }
                </div> */}
                <button id="close-button" onClick={() => displayParticipantForm(false)}>
                    <p>X</p>
                </button>
                <div className="form-item">
                    <label htmlFor="first_name">First Name:</label>
                    <input
                        type="text"
                        id="first_name"
                        value={participantDetails.first_name}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-item">
                    <label htmlFor="last_name">Last Name:</label>
                    <input
                        type="text"
                        id="last_name"
                        value={participantDetails.last_name}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-item">
                    <label htmlFor="group">Group:</label>
                    {groupList ?
                        <select id="group" name="group" onChange={handleChange}>
                            {groupList.map(group => {
                                return checkIfCurrentlySelected(group);
                            })}
                        </select>
                        :
                        null
                    }
                </div>


                <button type="submit" onClick={handleSubmit}>
                    Save
                </button>
            </form>
        </div>
    )
}

export default participantForm;