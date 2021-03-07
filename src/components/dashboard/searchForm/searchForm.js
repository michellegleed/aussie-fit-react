import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from "@material-ui/core/styles";
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
    }, []);

    const useStyles = makeStyles({
        root: {
            color: "white",
            "&.Mui-focused": {
                color: "white",
            },
            "&:before": {
                borderBottomColor: "white"
            },
            "&:hover:not(.Mui-focused):before": {
                borderBottomColor: "white"
            },
            "&:after": {
                // focused
                borderBottomColor: "white"
            }
        },
        input: {
            "&::selection": {
                backgroundColor: "white",
                color: "white"
            }
        }
    });

    const useLabelStyles = makeStyles({
        root: {
            color: "white",
            "&.Mui-focused": {
                color: "white"
            }
        }
    });

    const classes = useStyles();
    const labelClasses = useLabelStyles();

    return (
        participantList != null ?
            <form id="search-form" autoComplete="off">
                <section>
                    <Autocomplete
                        id="search-box"
                        classes={classes}
                        options={participantList}
                        getOptionLabel={(option) => option.first_name + " " + option.last_name}
                        style={{ width: 220, color: "white" }}
                        size="small"
                        renderInput={(params) => <TextField {...params} variant="outlined" autoComplete="off" label="Search Participants" InputProps={{ classes: classes }}
                            InputLabelProps={{ classes: labelClasses }}
                        />}
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