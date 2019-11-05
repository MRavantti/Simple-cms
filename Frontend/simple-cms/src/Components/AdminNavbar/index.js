import React, { Component, Fragment } from 'react';

import './style.css'
import AdminMobileMenu from '../AdminMobileMenu';
import NavbarItems from '../NavbarItems'

class AdminNavbar extends Component {
    state = {
        menuVisable: false
    }

    toggleMenu = () => {
        this.setState(prevState => ({
            menuVisable: !prevState.menuVisable,
        }))
    }
    render() {
        return (
            <Fragment>
                <Fragment>
                    <AdminMobileMenu toggleMenu={this.toggleMenu} myClass={this.state.menuVisable && "visible"} />
                </Fragment>
                <div className="navbar">
                    <NavbarItems toggleMenu={this.toggleMenu} />
                </div>

            </Fragment>
        );
    }
}

export default AdminNavbar;