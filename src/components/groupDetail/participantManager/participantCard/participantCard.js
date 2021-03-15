import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchRequest } from '../../../../utils/fetchRequest';
import ArrowIcon from '../../../icons/arrow';

import './participantCard.css';

function ParticipantCard(props) {

    const { participant } = props;

    return (
        <div className="participant-card">
            <Link to={`/admin/participant/${participant.id}`}>
                <div className="table-row">
                    <p>{`${participant.first_name} ${participant.last_name}`}</p>
                    <div className="card-buttons edit-buttons">
                        <button>
                            <ArrowIcon />
                        </button>
                    </div>
                </div>
            </Link>
        </div >
    )
}

export default ParticipantCard;