import React, { useState } from 'react';
import { Link } from "react-router-dom";
import Moment from 'react-moment';
import { fetchRequest } from '../../../../utils/fetchRequest';

import QRCodeUrls from '../../qrCodeUrls/qrCodeUrls';

function GroupCard(props) {

    // const history = useHistory();

    const { group, editGroup, refetchGroupList } = props;

    const [showQRComponent, setShowQRCodeComponent] = useState(false);

    const getQRCode = () => {
        setShowQRCodeComponent(true);
    }

    const [deleteGroupID, setDeleteGroupID] = useState();

    const deleteGroup = (groupID) => {
        setDeleteGroupID(groupID);
    }

    const deleteData = () => {
        fetchRequest(`${process.env.REACT_APP_API_URL}groups/${group.id}/`, "DELETE")
            .then(result => {
                console.log("result is", result)
                if (result.ok) {
                    refetchGroupList();
                    console.log("successfully deleted something!")
                } else {
                    // the API returned an error - do something with it
                    console.error(data);
                    setErrorMessage("All fields are required.");
                }
            })
            // .catch(error => history.push("/network-error"))
            .catch(error => console.log(error))
    }

    return (
        <React.Fragment>
            {
                deleteGroupID ?
                    <div>
                        <h4>Permanently delete {group.group_name}?</h4>
                        <button onClick={() => deleteData()}>OK</button>
                        <button onClick={() => setDeleteGroupID(null)}>Cancel</button>
                    </div>
                    :
                    null
            }
            {
                showQRComponent ?
                    <QRCodeUrls groupID={group.id} />
                    :
                    null
            }
            <div>
                <button onClick={() => getQRCode()}>QR Code</button>
                <button onClick={() => editGroup(group.id)}>edit</button>
                <button onClick={() => deleteGroup(group.id)}>X</button>
            </div>
            <Link to={`/admin/${group.id}/`}>
                <div>
                    <div>
                        <h2>{group.group_name}</h2>
                        <p>{group.number_of_participants}</p>
                    </div>

                    <p>Next Session:</p>
                    {
                        group.next_class != null ?
                            <React.Fragment>
                                <h6>{group.next_class[0].title}</h6>
                                <p><Moment format="DD/MM/YY">{group.next_class[0].time}</Moment> @ <Moment format="h:mma">{group.next_class.time}</Moment></p>
                            </React.Fragment>
                            :
                            <h4>No upcoming classes</h4>
                    }

                </div>
            </Link>
        </React.Fragment>
    )
}

export default GroupCard;