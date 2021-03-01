import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { fetchRequest } from '../../../utils/fetchRequest';

import './searchForm.css';
import SearchIcon from '../../icons/search';

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
            <form id="search-form" autoComplete="off">
                <section>
                    <Autocomplete
                        id="search-box"
                        options={participantList}
                        getOptionLabel={(option) => option.first_name + " " + option.last_name}
                        style={{ width: 220 }}
                        size="small"
                        renderInput={(params) => <TextField {...params} variant="outlined" autoComplete="off" label="Search Participants" />}
                        onChange={(e, value) => setParticipantID(value != null ? value.id : null)}
                    />
                </section>
                <button onClick={viewParticipantPage}><SearchIcon /></button>
            </form>
            :
            null
    )
}

export default SearchForm;