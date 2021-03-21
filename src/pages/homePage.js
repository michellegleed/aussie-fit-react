import React from 'react';
import Dashboard from './admin/dashboard';

function HomePage(props) {

    const { userIsAdmin } = props;

    // const history = useHistory();

    return (
        userIsAdmin ?
            <Dashboard />
            :
            <div>
                <h1>Accessing the Attendance Register:</h1>
                <h2>Use your phone's camera to scan the QR code for this class.</h2>
                <h2>Alternatively, type the URL for your group into an internet browser.</h2>
                <br />
                <h4>The class facilitator will make these available at the beginning of each session.</h4>
            </div>
    )
}

export default HomePage;