import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { fetchRequest } from '../../../utils/fetchRequest';

function NameForm(props) {

    const { participants } = props;
    const { classID } = props;

    const [participantID, setParticipantID] = useState();

    const history = useHistory();

    const registerAttendance = () => {
        fetchRequest(`${process.env.REACT_APP_API_URL}participants/${participantID}/class/${classID}`)
        history.push("/check-in");
    }

    // const participants = [
    //     { first_name: "Evie", last_name: "Smith" },
    //     { first_name: "Mako", last_name: "Edwards" },
    //     { first_name: "Billy", last_name: "Smith" },
    //     { first_name: "Ruby", last_name: "Smith" },
    // ]

    return (
        <form autocomplete="off">
            <section>
                <label for="participant">Name:</label>
                <Autocomplete
                    id="combo-box-demo"
                    options={participants}
                    getOptionLabel={(option) => option.first_name + " " + option.last_name}
                    style={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} variant="outlined" autocomplete="off" />}
                    onChange={(e, value) => setParticipantID(value.id)}
                />
            </section>
            <button onClick={registerAttendance}>Next</button>
        </form>
    )
}

export default NameForm;