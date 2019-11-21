import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

import './style.css'
import CrossIcon from '../../images/admin-cross-icon.svg'

class AdminMobileMenu extends Component {
    render() {
        const { toggleMenu, myClass } = this.props;

        return (
            <Fragment>
                <div className={`admin-mobile-menu ${myClass}`}>
                    <img className="cross-icon" onClick={toggleMenu} src={CrossIcon} alt="Cross Icon" />

                    <div className="Admin-mobile-menu-items">
                        <Link onClick={toggleMenu} to="/">Return to site</Link>
                        <div className="mobile-menu-line" />
                        <Link onClick={toggleMenu} to="/admin/start">Admin start page</Link>
                        <Link onClick={toggleMenu} to="/admin/pages">Pages</Link>
                        <Link onClick={toggleMenu} to="/admin/posts">Posts</Link>
                        <Link onClick={toggleMenu} to="/admin/users">Users</Link>
                        <Link onClick={toggleMenu} to="/admin/info/company-information">Company information</Link>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default AdminMobileMenu;