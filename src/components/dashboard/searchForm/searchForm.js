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

    const [errorMessage, setErrorMessage] = useState();

    const history = useHistory();

    const viewParticipantPage = () => {
        if (participantID != null) {
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
                    setErrorMessage("Could not access participant data. Refresh the page and try again.")
                }
            })
    }, []);

    const mediaQueryMatch = window.matchMedia('(min-width: 720px)');
    const [matches, setMatches] = useState(mediaQueryMatch.matches)

    useEffect(() => {
        const changeHandler = e => setMatches(e.matches);
        mediaQueryMatch.addListener(changeHandler);
        return () => mediaQueryMatch.removeListener(changeHandler);
    });

    return (
        <React.Fragment>
            <div className="error-message">
                {
                    errorMessage ?
                        <ErrorMessage message={errorMessage} type="error" />
                        :
                        null
                }
            </div>
        participantList != null ?
            <form id="search-form" autoComplete="off">
                <section>
                    <Autocomplete
                        id="search-box"
                        options={participantList}
                        getOptionLabel={(option) => option.first_name + " " + option.last_name}
                        style={{ width: 220, color: matches ? "black" : "white" }}
                        size="small"
                        renderInput={(params) => <TextField
                            {...params}
                            variant="outlined"
                            autoComplete="off"
                            label="Search Participants"
                            InputProps={{
                                ...params.InputProps,
                                style: { color: matches ? "black" : "white" }
                            }}
                            InputLabelProps={{
                                ...params.InputLabelProps,
                                style: { color: matches ? "black" : "white", fontFamily: "Montserrat" }
                            }}
                        />}
                        onChange={(e, value) =>
                            setParticipantID(value != null ? value.id : null)
                        }
                    />
                </section>
                <button onClick={viewParticipantPage}><SearchIcon /></button>
            </form>
            :
            null
        </React.Fragment>
    )
}

export default SearchForm;