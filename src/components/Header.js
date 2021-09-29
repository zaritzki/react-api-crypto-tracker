import React from 'react';
import { Link } from 'react-router-dom';

import logo from "../assets/logo.png";

const Header = () => {
    return (
        <div className="header">
            <Link to="/" className="coin-title">
                <img className="logo" src={logo} alt="React CryptoCurrency Tracker"  />
                <span>React CryptoCurrency Tracker</span>
            </Link>
        </div>
    )
}

export default Header
