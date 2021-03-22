import React, { useEffect, useState } from 'react';
import ParticipantCard from '../participantCard/participantCard';
import ParticipantForm from '../participantForm/participantForm';
// import PlusIcon from '../../../icons/plus';

import { fetchRequest } from '../../../../utils/fetchRequest';
import PlusButton from '../../../buttons/plusButton/plusButton';
import ErrorMessage from '../../../errorMessage/errorMessage';

function Participants(props) {

    const [participantList, setParticipantList] = useState();
    const { group } = props;

    const [showparticipantForm, setShowparticipantForm] = useState(false);

    const [participantToEdit, setParticipantToEdit] = useState();

    const [refetchparticipants, setRefetchParticipants] = useState(0);

    const [errorMessage, setErrorMessage] = useState();

    useEffect(() => {
        fetchRequest(`${process.env.REACT_APP_API_URL}groups/${group}/`)
            .then((result) => {
                if (result.ok) {
                    setParticipantList(result.data.participants);
                }
                else {
                    setErrorMessage("Unable to fetch participant data. Refresh the page to try again.");
                }
            });
    }, [refetchparticipants]);

    const refetchParticipantList = () => {
        setRefetchParticipants((prevState) => prevState + 1)
    }

    const displayParticipantForm = (bool) => {
        setShowparticipantForm(bool);

        // this clears group details from form upon closing
        if (bool === false) {
            setParticipantToEdit(null)
        }
    }

    const populateParticipantForm = () => {
        return participantToEdit ? participantList.filter(participant => participant.id == participantToEdit)[0] : { first_name: "", last_name: "", group: group };
    }

    return (
        <div id="participant-section">
            <div className="error-message">
                {
                    errorMessage ?
                        <ErrorMessage message={errorMessage} type="error" />
                        :
                        null
                }
            </div>
            <h2>Participants</h2>
            <PlusButton clickHandler={() => displayParticipantForm(true)} buttonText="New Participant" />
            {
                showparticipantForm ?
                    <ParticipantForm groupID={group} participant={populateParticipantForm()} displayParticipantForm={displayParticipantForm} refetchParticipantList={refetchParticipantList} />
                    :
                    null
            }
            {
                participantList != null && participantList.length > 0 ?
                    participantList.map(participant => <ParticipantCard key={participant.id} participant={participant} />)
                    :
                    <h4>No participants found</h4>
            }
        </div>
    )
}

export default Participants;