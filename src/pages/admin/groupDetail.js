import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import Classes from '../../components/groupDetail/classManager/classes/classes';
import Participants from '../../components/groupDetail/participantManager/participants/participants';
import Spinner from '../../components/spinner/spinner';
import ErrorMessage from '../../components/errorMessage/errorMessage';

import { fetchRequest } from '../../utils/fetchRequest';


function GroupDetail() {

    const [groupData, setGroupData] = useState();

    const { id } = useParams();

    const loadingRef = useRef(false);

    const [errorMessage, setErrorMessage] = useState();

    useEffect(() => {
        loadingRef.current = true;
        fetchRequest(`${process.env.REACT_APP_API_URL}groups/${id}/`)
            .then((result) => {
                loadingRef.current = false
                if (result.ok) {
                    setGroupData(result.data);
                }
                else {
                    setErrorMessage("No data found for this group. Try refreshing the page.");
                }
            });
    }, []);

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
            {groupData ?
                <div>
                    <h1>{groupData.group_name}</h1>
                    <div className="admin-page">
                        {
                            loadingRef.current == true ?
                                <Spinner />
                                :
                                <React.Fragment>
                                    <Classes group={id} />
                                    <Participants group={id} />
                                </React.Fragment>
                        }

                    </div>
                </div >
                :
                null
            }
        </React.Fragment>
    )
}

export default GroupDetail;