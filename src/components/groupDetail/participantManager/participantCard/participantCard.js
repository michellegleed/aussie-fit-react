import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Moment from 'react-moment';
import { fetchRequest } from '../../../../utils/fetchRequest';

import CloseIcon from '../../../icons/close';
import PencilIcon from '../../../icons/pencil';

function ParticipantCard(props) {

    const history = useHistory();

    const { participant, editParticipant, refetchParticipantList } = props;

    const [deleteParticipantID, setDeleteParticipantID] = useState();

    const deleteParticipant = (participantID) => {
        setDeleteParticipantID(participantID);
    }

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
        <div className="class-card">
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
            <div className="table-row">
                <p>{`${participant.first_name} ${participant.last_name}`}</p>
                <div className="card-buttons edit-buttons">
                    <button onClick={() => editParticipant(participant.id)}><PencilIcon /></button>
                    <button onClick={() => deleteParticipant(participant.id)}><CloseIcon /></button>
                </div>
            </div>
        </div>
    )
}

export default ParticipantCard;