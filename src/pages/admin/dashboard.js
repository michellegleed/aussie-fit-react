import React from 'react';
import Groups from '../../components/dashboard/groupManager/groups/groups';
import Quiz from '../../components/dashboard/quizManager/quiz/quiz';

import "react-datetime/css/react-datetime.css";


function Dashboard() {
    return (
        <div className="admin-page">
            <Groups />
            <Quiz />
        </div>
    )
}

export default Dashboard;