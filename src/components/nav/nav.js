import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from "react-router-dom";

function Nav() {

    /// Update Nav Based on Logged In/Out
    const [loggedIn, setLoggedIn] = useState(false);

    // location variable will update whenever the react app's url changes
    const location = useLocation();

    // runs @ first render and whenever url location changes
    useEffect(() => {
        const token = window.localStorage.getItem("token");
        if (token) {
            setLoggedIn(true);
        }
        else {
            setLoggedIn(false);
        }
    }, [location]);


    /// Logout
    const handleLogout = () => {
        window.localStorage.clear();
    };

    return (
        <nav>
            <div id="nav-container">
                <div className="nav-logo">
                    <i class="far fa-lightbulb"></i>
                </div>
                {loggedIn ?
                    <div className="nav-menu-items">
                        {/* check if user is admin */}
                        <React.Fragment>
                            <div className="nav-item">
                                <NavLink to="/admin" activeStyle={{ color: 'rgb(4, 180, 4)' }}>Admin</NavLink>
                            </div>
                            <div className="nav-item">
                                <a href={`${process.env.REACT_APP_API_URL}participants/attendance-to-csv/`}>Download Attendance Data</a>
                            </div>
                        </React.Fragment>
                        {/* : */}
                        <div className="nav-item">
                            <NavLink exact to="/" activeStyle={{ color: 'rgb(4, 180, 4)' }}>Home</NavLink>
                        </div>
                        <Link to="/login" onClick={handleLogout}>Log Out</Link>
                    </div>
                    :
                    <div className="nav-menu-items logged-out">
                        <div className="nav-item">
                            <Link to="/login">Log In</Link>
                        </div>
                    </div>
                }
            </div >
        </nav >
    )
}

export default Nav;