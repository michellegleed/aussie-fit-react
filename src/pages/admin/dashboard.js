import React from 'react';
import Groups from '../../components/dashboard/groupManager/groups/groups';
import Quiz from '../../components/dashboard/quizManager/quiz/quiz';

import "react-datetime/css/react-datetime.css";


function Dashboard() {
    return (
        <React.Fragment>
            <Groups />
            <Quiz />
        </React.Fragment>
    )
}

export default Dashboard;