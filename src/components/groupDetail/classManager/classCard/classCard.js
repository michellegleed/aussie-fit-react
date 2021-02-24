import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Moment from 'react-moment';
import { fetchRequest } from '../../../../utils/fetchRequest';

import CloseIcon from '../../../icons/close';
import PencilIcon from '../../../icons/pencil';

function ClassCard(props) {

    const history = useHistory();

    const { session, editClass, refetchClassList } = props;

    const [deleteClassID, setDeleteClassID] = useState();

    const deleteClass = (classID) => {
        setDeleteClassID(classID);
    }

    const deleteData = () => {
        fetchRequest(`${process.env.REACT_APP_API_URL}classes/${session.id}/`, "DELETE")
            .then(result => {
                console.log("result is", result)
                if (result.ok) {
                    refetchClassList();
                    setDeleteClassID(null);
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

    // icons might be better here than strings :)
    const getClassStatus = (session) => {
        if (session.in_progress) {
            return "In Progress"
        }
        else if (session.is_finished) {
            return "Finished"
        }
        else return "Not started"
    }

    return (
        <React.Fragment>
            {
                deleteClassID ?
                    <div>
                        <h4>Permanently delete {session.title}?</h4>
                        <button onClick={() => deleteData()}>OK</button>
                        <button onClick={() => setDeleteClassID(null)}>Cancel</button>
                    </div>
                    :
                    null
            }
            <div>
                <div>
                    <p>{session.title}</p>
                    <Moment format="DD/MM/YY">{session.time}</Moment>
                    <br></br>
                    <Moment format="h:mma">{session.time}</Moment>
                    <p>{getClassStatus(session)}</p>
                    <div>
                        <button onClick={() => editClass(session.id)}><PencilIcon /></button>
                        <button onClick={() => deleteClass(session.id)}><CloseIcon /></button>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default ClassCard;