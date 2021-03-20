import React, { useState, useRef, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { fetchRequest } from '../utils/fetchRequest';

import Header from '../components/attendance/header/header';
import NameForm from '../components/attendance/nameForm/nameform';
import Spinner from '../components/spinner/spinner';

function AttendancePage() {

    const [groupData, setGroupData] = useState();

    // const [nextClass, setNextClass] = useState();

    const history = useHistory();

    const { id } = useParams();

    const loadingRef = useRef(false);

    useEffect(() => {
        loadingRef.current = true;
        fetchRequest(`${process.env.REACT_APP_API_URL}groups/${id}/`)
            .then((result) => {
                loadingRef.current = false;
                if (result.ok) {
                    setGroupData(result.data);
                }
                else if (result.status === 401) {
                    history.push("/login");
                }
            })
    }, []);

    return (
        <div>
            {
                loadingRef.current == true ?
                    <Spinner />
                    :
                    groupData ?
                        <React.Fragment>
                            <Header groupName={groupData.group_name} nextClass={groupData.next_class ? groupData.next_class[0] : null} />
                            {/* check if class is currently open otherwise don't show this form!!! */}
                            {groupData.next_class != null && groupData.next_class[0].in_progress ?
                                <NameForm participants={groupData.participants} classID={groupData.next_class[0].id} />
                                :
                                groupData.next_class != null ?
                                    <h5>Attendance for this class opens one hour before start time.</h5>
                                    :
                                    null
                            }

                        </React.Fragment>
                        :
                        null
            }
        </div>
    )
}

export default AttendancePage;