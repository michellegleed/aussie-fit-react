import React, { useState } from 'react';
import { Link } from "react-router-dom";
import Moment from 'react-moment';
import { fetchRequest } from '../../../../utils/fetchRequest';
import ErrorMessage from '../../../errorMessage/errorMessage';

import QRCodeUrls from '../../qrCodeUrls/qrCodeUrls';
import CloseIcon from '../../../icons/close';
import PencilIcon from '../../../icons/pencil';
import UsersIcon from '../../../icons/users';

import './groupCard.css';
import QRCodeIcon from '../../../icons/qrCode';

function GroupCard(props) {

    // const history = useHistory();

    const [errorMessage, setErrorMessage] = useState();

    const { group, editGroup, refetchGroupList } = props;

    const [showQRComponent, setShowQRCodeComponent] = useState(false);

    const getQRCode = () => {
        setShowQRCodeComponent(true);
    }

    const closeQRModal = () => {
        setShowQRCodeComponent(false);
    }

    const [deleteGroupID, setDeleteGroupID] = useState();

    const deleteGroup = (groupID) => {
        setDeleteGroupID(groupID);
    }

    const deleteData = () => {
        fetchRequest(`${process.env.REACT_APP_API_URL}groups/${group.id}/`, "DELETE")
            .then(result => {
                if (result.ok) {
                    refetchGroupList();
                } else {
                    // the API returned an error - do something with it
                    console.error("Delete op failed.");
                    setErrorMessage("Unable to perform this operation at this time. Refresh the page and try again.");
                }
            })
            // .catch(error => history.push("/network-error"))
            .catch(error => setErrorMessage("Network error."))
    }

    return (
        <div className="card">
            <div className="error-message">
                {
                    errorMessage ?
                        <ErrorMessage message={errorMessage} type="error" />
                        :
                        null
                }
            </div>

            {
                deleteGroupID ?
                    <div className="modal">
                        <div className="modal-content">
                            <h4>Permanently delete {group.group_name}?</h4>
                            <div className="button-row">
                                <button onClick={() => deleteData()}>OK</button>
                                <button onClick={() => setDeleteGroupID(null)}>Cancel</button>
                            </div>
                        </div>
                    </div>
                    :
                    null
            }
            {
                showQRComponent ?
                    <QRCodeUrls groupID={group.id} closeModal={closeQRModal} />
                    :
                    null
            }
            <div className="card-buttons edit-buttons">
                <button onClick={() => editGroup(group.id)}><PencilIcon /></button>
                {/* <button onClick={() => deleteGroup(group.id)}><img src="/icons/close.svg" alt="Delete Group" /></button> */}
                <button onClick={() => deleteGroup(group.id)}><CloseIcon /></button>
            </div>
            <Link to={`/admin/${group.id}/`}>
                <div className="card-content">
                    <div>
                        <div className="participants-icon">
                            <UsersIcon color="orange" />
                            <p>{group.number_of_participants}</p>
                        </div>
                        <h2>{group.group_name}</h2>
                    </div>

                    <p>Next Session:</p>
                    {
                        group.next_class != null ?
                            <React.Fragment>
                                <h6>{group.next_class[0].title}</h6>
                                <p><Moment format="DD/MM/YY">{group.next_class[0].time}</Moment> @ <Moment format="h:mma">{group.next_class[0].time}</Moment></p>
                            </React.Fragment>
                            :
                            <h4>No upcoming classes</h4>
                    }
                </div>
            </Link>
            <div className="card-buttons qr-button">
                <button onClick={() => getQRCode()}><QRCodeIcon /></button>
            </div>
        </div>
    )
}

export default GroupCard;