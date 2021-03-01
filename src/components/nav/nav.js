import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from "react-router-dom";
import { fetchRequest } from '../../utils/fetchRequest';
import SearchForm from '../dashboard/searchForm/searchForm';
import CloseIcon from '../icons/close';
import MenuIcon from '../icons/menu';

import './nav.css';

function Nav() {

    // location variable will update whenever the react app's url changes
    const location = useLocation();

    /// Update Nav Based on Logged In/Out and logged in user isAdmin or not
    const [loggedIn, setLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState();

    const [showMobileNav, setShowMobileNav] = useState(false);

    const checkUserPermissions = () => {
        fetchRequest(`${process.env.REACT_APP_API_URL}user/`)
            .then((result) => {
                if (result.ok) {
                    setIsAdmin(result.data.is_admin);
                }
                else {
                    console.log("couldn't get user permissions");
                }
            })
    }


    // runs @ first render and whenever url location changes
    useEffect(() => {
        const token = window.localStorage.getItem("token");
        if (token) {
            setLoggedIn(true);
            if (isAdmin == null) {
                checkUserPermissions();
            }
        }
        else {
            setLoggedIn(false);
            setIsAdmin();
        }
    }, [location]);

    const toggleMobileNav = (bool) => {
        setShowMobileNav(bool)
    }

    /// Logout
    const handleLogout = () => {
        window.localStorage.clear();
    };

    return (
        <nav>
            <div id="menu-button-container">
                {
                    showMobileNav ?
                        null
                        :
                        <div onClick={() => toggleMobileNav(true)} className="menu-button"><MenuIcon /></div>
                }
            </div>
            {loggedIn ?
                <div className={showMobileNav ? " nav-menu-items nav-active" : "nav-menu-items"}>
                    {isAdmin ?
                        <React.Fragment>
                            <div className="menu-button" onClick={() => toggleMobileNav(false)}><CloseIcon color="white" /></div>
                            <div className="nav-item" onClick={() => toggleMobileNav(false)}>
                                <NavLink to="/admin" activeStyle={{ color: 'rgb(4, 180, 4)' }}>Dashboard</NavLink>
                            </div>
                            <div className="nav-item" onClick={() => toggleMobileNav(false)}>
                                <a href={`${process.env.REACT_APP_API_URL}participants/attendance-to-csv/`}>Download Attendance Data</a>
                            </div>
                            <div className="nav-item">
                                <SearchForm />
                            </div>
                        </React.Fragment>
                        :
                        <div className="nav-item" onClick={() => toggleMobileNav(false)}>
                            <NavLink exact to="/" activeStyle={{ color: 'rgb(4, 180, 4)' }}>Home</NavLink>
                        </div>
                    }
                    <div className="nav-item" onClick={() => toggleMobileNav(false)}>
                        <Link to="/login" onClick={handleLogout}>Log Out</Link>
                    </div>
                </div>
                :
                <div className="nav-menu-items logged-out">
                    <div className="nav-item" onClick={() => toggleMobileNav(false)}>
                        <Link to="/login">Log In</Link>
                    </div>
                </div>
            }
        </nav >
    )
}

export default Nav;