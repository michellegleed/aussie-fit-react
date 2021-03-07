import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from "@material-ui/core/styles";
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

    const useStyles = makeStyles({
        root: {
            color: "#fff"
            // "&.Mui-focused": {
            //     color: "#fff",
            // },
            // "&:before": {
            //     borderBottomColor: "#fff"
            // },
            // "&:hover:not(.Mui-focused):before": {
            //     borderBottomColor: "#fff"
            // },
            // "&:after": {
            //     // focused
            //     borderBottomColor: "#fff"
            // }
        },
        input: {
            "&::selection": {
                backgroundColor: "#fff",
                color: "#fff"
            },
        },
        MuiInputBase: {
            root: {
                color: "#fff"
            },
        },
    })

    const useLabelStyles = makeStyles({
        root: {
            color: "white",
            "&.Mui-focused": {
                color: "white"
            }
        }
    })

    const classes = useStyles();
    const labelClasses = useLabelStyles();

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
            <section id="autocomplete-bottom-border">
                <label htmlFor="participant">Name:</label>
                <Autocomplete
                    id="participant"
                    // classes={classes}
                    options={participants}
                    getOptionLabel={(option) => option.first_name + " " + option.last_name}
                    style={{ width: 300, color: "#fff" }}
                    renderInput={(params) => <TextField {...params} variant="outlined" autoComplete="off"
                        InputProps={{ ...params.InputProps, classes: classes, style: { color: "#fff" } }}
                        InputLabelProps={{ ...params.InputLabelProps, classes: labelClasses }}
                    />}
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