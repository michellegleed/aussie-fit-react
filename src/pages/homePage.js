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
                <h1> ​​Aussie-FIT (AFL Fans in Training) is a 12-week healthy lifestyle program designed specifically for men.</h1>
                <h4>Based on the highly successful Football Fans in Training (FFIT) program in the UK, and recently piloted with 130 guys in WA. Aussie-FIT is scientifically informed and evidence-based, and is unlike any other health program in WA. As part of the Aussie-FIT team, we use men's passion for footy to make getting fit and healthy more fun.</h4>
            </div>
    )
}

export default HomePage;