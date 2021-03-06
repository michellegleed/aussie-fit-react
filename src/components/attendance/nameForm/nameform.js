import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import ErrorMessage from '../../errorMessage/errorMessage';
import { fetchRequest } from '../../../utils/fetchRequest';

import './nameform.css';

function NameForm(props) {

    const { participants } = props;
    const { classID } = props;

    const [participantID, setParticipantID] = useState();

    const [errorMessage, setErrorMessage] = useState();

    const history = useHistory();

    const registerAttendance = (e) => {
        e.preventDefault();
        if (participantID != null) {
            fetchRequest(`${process.env.REACT_APP_API_URL}participants/${participantID}/class/${classID}`)
            history.push("/check-in");
        }
        else {
            setErrorMessage("Choose your name from the list to continue")
        }
    }

    return (
        <form autoComplete="off">
            <div className="error-message">
                {
                    errorMessage ?
                        <ErrorMessage message={errorMessage} type="error" />
                        :
                        null
                }
            </div>
            <section>
                <label htmlFor="participant">Name:</label>
                <Autocomplete
                    id="participant"
                    options={participants}
                    getOptionLabel={(option) => option.first_name + " " + option.last_name}
                    style={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} variant="outlined" autoComplete="off" />}
                    onChange={(e, value) => setParticipantID(value != null ? value.id : null)}
                />
            </section>
            <div className="centered-button-container">
                <button className="text-button" onClick={e => registerAttendance(e)}>Next</button>
            </div>
        </form>
    )
}

export default NameForm;