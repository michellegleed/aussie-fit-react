import React, { useContext, useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from "react-router-dom";
import { fetchRequest } from '../../utils/fetchRequest';
import SearchForm from '../dashboard/searchForm/searchForm';
import CloseIcon from '../icons/close';
import MenuIcon from '../icons/menu';

// import { ThemeContext } from '../../utils/context';

import './nav.css';

function Nav(props) {

    const { updateIsAdmin } = props;

    // location variable will update whenever the react app's url changes
    const location = useLocation();

    /// Update Nav Based on Logged In/Out and logged in user isAdmin or not
    const [loggedIn, setLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState();
    // const { actions } = useContext(ThemeContext);

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

    useEffect(() => {
        if (isAdmin != null) {
            // const themeColors = isAdmin ? { background: "#fff", foreground: "#232323" } : { background: "#232323", foreground: "#fff" }
            // actions.updateThemeColors(themeColors);
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

    const getNavItemStyle = () => {
        if (isAdmin != null) {
            console.log("getting nav theme colors - isAdmin is ", isAdmin);
            return isAdmin ? { color: "#fff", stroke: "#fff" } : { color: "#232323", stroke: "#232323" }
        }
    }

    return (
        <nav>
            <div id="menu-button-container">
                {
                    showMobileNav ?
                        null
                        :
                        <div onClick={() => toggleMobileNav(true)} className="menu-button"><MenuIcon id={isAdmin ? "dark-svg" : "light-svg"}
                        // style={isAdmin ? { color: "#232323", stroke: "#232323" } : { color: "#fff", stroke: "#fff" }}
                        /></div>
                }
            </div>
            {loggedIn ?
                <div className={showMobileNav ? " nav-menu-items nav-active" : "nav-menu-items"} style={isAdmin ? { backgroundColor: "rgba(0,0,0,.75)" } : { backgroundColor: "rgba(255,255,255,.75" }}>
                    <div className={`menu-button ${isAdmin ? "light-svg" : "dark-svg"}`} onClick={() => toggleMobileNav(false)}><CloseIcon id={isAdmin ? "light-svg" : "dark-svg"} /></div>
                    {isAdmin ?
                        <React.Fragment>
                            <div className="nav-item" onClick={() => toggleMobileNav(false)}>
                                <NavLink to="/admin" style={getNavItemStyle()} activeStyle={{ color: 'rgb(4, 180, 4)' }}>Dashboard</NavLink>
                            </div>
                            <div className="nav-item" onClick={() => toggleMobileNav(false)}>
                                <a href={`${process.env.REACT_APP_API_URL}participants/attendance-to-csv/`} style={getNavItemStyle()}>Download Attendance Data</a>
                            </div>
                            <div className="nav-item">
                                <SearchForm style={getNavItemStyle()} />
                            </div>
                        </React.Fragment>
                        :
                        <div className="nav-item" onClick={() => toggleMobileNav(false)}>
                            <NavLink exact to="/" style={getNavItemStyle()} activeStyle={{ color: 'rgb(4, 180, 4)' }}>Home</NavLink>
                        </div>
                    }
                    <div className="nav-item" onClick={() => toggleMobileNav(false)}>
                        <Link to="/login" style={getNavItemStyle()} onClick={handleLogout}>Log Out</Link>
                    </div>
                </div>
                :
                <div className="nav-menu-items logged-out">
                    <div className="nav-item" onClick={() => toggleMobileNav(false)}>
                        <Link to="/login" style={getNavItemStyle()}>Log In</Link>
                    </div>
                </div>
            }
        </nav >
    )
}

export default Nav;