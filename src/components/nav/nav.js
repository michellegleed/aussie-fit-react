import React, { useEffect, useState } from 'react';
import { Link, NavLink, useHistory, useLocation } from "react-router-dom";
import { fetchRequest } from '../../utils/fetchRequest';
import SearchForm from '../dashboard/searchForm/searchForm';
import CloseIcon from '../icons/close';
import MenuIcon from '../icons/menu';

import './nav.css';

function Nav(props) {

    const { updateIsAdmin } = props;

    // location variable will update whenever the react app's url changes
    const location = useLocation();
    const history = useHistory();

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
                    setIsAdmin(false);
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

    useEffect(() => {
        if (isAdmin != null) {
            updateIsAdmin(isAdmin);
        }
    }, [isAdmin])

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
                        <div onClick={() => toggleMobileNav(true)} className="menu-button"><MenuIcon id={isAdmin ? "dark-svg" : "light-svg"}
                        /></div>
                }
            </div>
            {loggedIn ?
                <div
                    className={`nav-menu-items ${showMobileNav ? "nav-active" : ""} ${isAdmin ? "light-theme" : "dark-theme"}`
                    }>
                    <div className={`menu-button ${isAdmin ? "light-svg" : "dark-svg"}`} onClick={() => toggleMobileNav(false)}><CloseIcon id={isAdmin ? "light-svg" : "dark-svg"} /></div>
                    {isAdmin ?
                        <React.Fragment>
                            <div className="nav-item" onClick={() => toggleMobileNav(false)}>
                                <NavLink to="/admin">Dashboard</NavLink>
                            </div>
                            <div className="nav-item" onClick={() => toggleMobileNav(false)}>
                                <a href={`${process.env.REACT_APP_API_URL}participants/attendance-to-csv/`} >Download Attendance Data</a>
                            </div>
                            <div className="nav-item">
                                <SearchForm />
                            </div>
                        </React.Fragment>
                        :
                        <div className="nav-item" onClick={() => toggleMobileNav(false)}>
                            {/* <a onClick={() => history.goBack()}>Home</a> */}
                            <NavLink to="/">Home</NavLink>
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