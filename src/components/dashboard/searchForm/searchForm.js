import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { fetchRequest } from '../../../utils/fetchRequest';

function SearchForm() {

    const [participantList, setParticipantList] = useState();

    const [participantID, setParticipantID] = useState();

    const history = useHistory();

    const viewParticipantPage = () => {
        if (participantID != null) {
            // fetchRequest(`${process.env.REACT_APP_API_URL}participants/${participantID}/class/${classID}`)
            history.push(`/admin/participant/${participantID}`);
        }
    }

    useEffect(() => {
        fetchRequest(`${process.env.REACT_APP_API_URL}participants/`)
            .then((result) => {
                if (result.ok) {
                    setParticipantList(result.data);
                }
                else {
                    console.log("couldn't find participants");
                }
            })
    }, [])

    return (
        participantList != null ?
            <form autoComplete="off">
                <section>
                    <label htmlFor="search-box">Name:</label>
                    <Autocomplete
                        id="search-box"
                        options={participantList}
                        getOptionLabel={(option) => option.first_name + " " + option.last_name}
                        style={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} variant="outlined" autoComplete="off" />}
                        onChange={(e, value) => setParticipantID(value != null ? value.id : null)}
                    />
                </section>
                <button onClick={viewParticipantPage}>Go</button>
            </form>
            :
            null
    )
}

export default SearchForm;