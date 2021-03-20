import React from 'react';
import Moment from 'react-moment';

import CloseIcon from '../../../icons/close';
import PencilIcon from '../../../icons/pencil';

import './classCard.css';

function ClassCard(props) {

    const { session, editClass, deleteClass } = props;

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
        <div className="class-card">
            <div className="table-row">
                <p>{session.title}</p>
                <Moment format="DD/MM/YY">{session.time}</Moment>
                <Moment format="h:mma">{session.time}</Moment>
                <p>{getClassStatus(session)}</p>
                <div className="card-buttons edit-buttons">
                    <button onClick={() => editClass(session.id)}><PencilIcon /></button>
                    <button onClick={() => deleteClass(session.id)}><CloseIcon /></button>
                </div>
            </div>
        </div>
    )
}

export default ClassCard;