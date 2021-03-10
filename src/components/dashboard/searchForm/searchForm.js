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

    const mediaQueryMatch = window.matchMedia('(min-width: 720px)');
    const [matches, setMatches] = useState(mediaQueryMatch.matches)

    useEffect(() => {
        const changeHandler = e => setMatches(e.matches);
        mediaQueryMatch.addListener(changeHandler);
        return () => mediaQueryMatch.removeListener(changeHandler);
    });

    const getStyles = (isMinMediaSize) => {
        const mainColor = isMinMediaSize ? "black" : "white";
        console.log("main color is ", mainColor);
        return makeStyles({
            root: {
                color: mainColor,
                "&.Mui-focused": {
                    color: mainColor,
                },
                "&:before": {
                    borderBottomColor: mainColor
                },
                "&:hover:not(.Mui-focused):before": {
                    borderBottomColor: mainColor
                },
                "&:after": {
                    // focused
                    borderBottomColor: mainColor
                }
            },
            input: {
                color: mainColor,
                "&.Mui-focused": {
                    color: mainColor,
                },
                "&::selection": {
                    backgroundColor: "transparent",
                    color: mainColor
                }
            }
        })
    }

    // const useStyles = makeStyles({
    //     // root: {
    //     //     color: "white",
    //     //     backgroundColor: "transparent",
    //     //     "&.Mui-focused": {
    //     //         color: "white",
    //     //         backgroundColor: "transparent"
    //     //     },
    //     root: {
    //         color: "white",
    //         "&.Mui-focused": {
    //             color: "white",
    //         },
    //         "&:before": {
    //             borderBottomColor: "white"
    //         },
    //         "&:hover:not(.Mui-focused):before": {
    //             borderBottomColor: "white"
    //         },
    //         "&:after": {
    //             // focused
    //             borderBottomColor: "white"
    //         }
    //     },
    //     input: {
    //         color: "white",
    //         "&.Mui-focused": {
    //             color: "white",
    //         },
    //         "&::selection": {
    //             backgroundColor: "transparent",
    //             color: "white"
    //         }
    //     }
    // });

    const getLabelStyles = (isMinMediaSize) => {
        const mainColor = isMinMediaSize ? "black" : "white";
        // const useLabelStyles = makeStyles({
        return makeStyles({
            root: {
                color: mainColor,
                "&.Mui-focused": {
                    color: mainColor
                }
            }
        })
    }

    // const classes = useStyles();
    // const labelClasses = useLabelStyles();

    const classes = getStyles(matches);
    const labelClasses = getLabelStyles(matches);

    return (
        participantList != null ?
            <form id="search-form" autoComplete="off">
                <section>
                    <Autocomplete
                        id="search-box"
                        classes={classes}
                        // classes={getStyles(matches)}
                        options={participantList}
                        getOptionLabel={(option) => option.first_name + " " + option.last_name}
                        style={{ width: 220, color: matches ? "black" : "white" }}
                        size="small"
                        renderInput={(params) => <TextField {...params} variant="outlined" autoComplete="off" label="Search Participants" InputProps={{ ...params.InputProps, classes: classes, style: { color: matches ? "black" : "white" } }}
                            InputLabelProps={{ ...params.InputLabelProps, classes: labelClasses, style: { color: matches ? "black" : "white" } }}
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