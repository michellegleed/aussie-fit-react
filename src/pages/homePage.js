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
                <h1>This is the home page. Info about the study can go here.</h1>
            </div>
    )
}

export default HomePage;