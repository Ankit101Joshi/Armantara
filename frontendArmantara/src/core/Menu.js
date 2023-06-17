import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const useCurrentTab = (path) => {
    const location = useLocation();
    if (location.pathname === path) {
        return { color: "#1FAA59" };
    } else {
        return { color: "#FFFF" };
    }
};

const Menu = () => {
    const currentTabStyle = useCurrentTab;

    return (
        <div>
            <ul className="nav nav-tabs bg-dark">
                <li className="nav-item">
                    <Link style={currentTabStyle("/")} className="nav-link" to="/">HOME</Link>
                </li>
                <li className="nav-item">
                    <Link style={currentTabStyle("/cart")} className="nav-link" to="/cart">CART</Link>
                </li>
                <li className="nav-item">
                    <Link style={currentTabStyle("/dashboard")} className="nav-link" to="/dashboard">Dashboard</Link>
                </li>
                <li className="nav-item">
                    <Link style={currentTabStyle("/admin/dashboard")} className="nav-link" to="/admin/dashboard">A. Dashboard</Link>
                </li>
                <li className="nav-item">
                    <Link style={currentTabStyle("/signup")} className="nav-link" to="/signup">SignUp</Link>
                </li>
                <li className="nav-item">
                    <Link style={currentTabStyle("/signin")} className="nav-link" to="/signin">SignIn</Link>
                </li>
                <li className="nav-item">
                    <Link style={currentTabStyle("/signout")} className="nav-link" to="/signout">SignOut</Link>
                </li>
            </ul>
        </div>
    );
};

export default Menu;
