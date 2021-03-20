import React from 'react';
import { useHistory } from 'react-router-dom';
import Groups from '../../components/dashboard/groupManager/groups/groups';
import Quiz from '../../components/dashboard/quizManager/quiz/quiz';

import "react-datetime/css/react-datetime.css";

function Dashboard() {

    const history = useHistory();

    const redirectToLogin = () => {
        history.push("/admin/login")
    }

    return (
        <div className="admin-page">
            <Groups redirectToLogin={redirectToLogin} />
            <Quiz redirectToLogin={redirectToLogin} />
        </div>
    )
}

export default Dashboard;