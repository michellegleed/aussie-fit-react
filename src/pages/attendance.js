import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { fetchRequest } from '../utils/fetchRequest';

import Header from '../components/attendance/header/header';
import NameForm from '../components/attendance/nameForm/nameform';

function AttendancePage() {

    const [groupData, setGroupData] = useState();

    const [nextClass, setNextClass] = useState();

    const history = useHistory();

    // will need to eventually get this from params!!!
    const groupID = 1;

    useEffect(() => {
        fetchRequest(`${process.env.REACT_APP_API_URL}groups/${groupID}/`)
            // fetchRequest(`https://still-forest-93396.herokuapp.com/groups/1/`)
            .then((result) => {
                if (result.ok) {
                    setGroupData(result.data);
                }
                else {
                    history.push("/notfound");
                    console.log("no group data")
                }
            })
    }, []);

    return (
        <div>
            { groupData ?
                <React.Fragment>
                    <Header groupName={groupData.group_name} nextClass={groupData.next_class ? groupData.next_class[0] : null} />
                    {/* check if class is currently open otherwise don't show this form!!! */}
                    {groupData.next_class != null && groupData.next_class[0].in_progress ?
                        <NameForm participants={groupData.participants} classID={groupData.next_class[0].id} />
                        :
                        <h4>Attendance for this class opens one hour before start time.</h4>
                    }

                </React.Fragment>
                :
                null
            }
        </div>
    )
}

export default AttendancePage;