import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchRequest } from '../../../../utils/fetchRequest';

import './participantCard.css';

function ParticipantCard(props) {

    const { participant, refetchParticipantList } = props;

    const [deleteParticipantID, setDeleteParticipantID] = useState();

    const deleteData = () => {
        fetchRequest(`${process.env.REACT_APP_API_URL}participants/${participant.id}/`, "DELETE")
            .then(result => {
                console.log("result is", result)
                if (result.ok) {
                    refetchParticipantList();
                    setDeleteParticipantID(null);
                    console.log("successfully deleted something!")
                } else {
                    // the API returned an error - do something with it
                    console.error(data);
                    setErrorMessage("All fields are required.");
                }
            })
            .catch(error => console.log(error));
        // .catch(error => history.push("/network-error"))
    }

    return (
        <div className="participant-card">
            {
                deleteParticipantID ?
                    <div className="modal">
                        <div className="modal-content">
                            <h4>{`Permanently delete ${participant.first_name} ${participant.last_name}?`}</h4>
                            <button onClick={() => deleteData()}>OK</button>
                            <button onClick={() => setDeleteParticipantID(null)}>Cancel</button>
                        </div>
                    </div>
                    :
                    null
            }
            <Link to={`/admin/participant/${participant.id}`}>
                <div className="table-row">
                    <p>{`${participant.first_name} ${participant.last_name}`}</p>
                </div>
            </Link>
        </div >
    )
}

export default ParticipantCard;