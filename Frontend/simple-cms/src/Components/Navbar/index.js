import React, { Component, Fragment } from 'react';

import './style.css'
import MobileMenu from '../MobileMenu';
import NavbarItems from '../NavbarItems'

class Navbar extends Component {
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
                    <MobileMenu toggleMenu={this.toggleMenu} myClass={this.state.menuVisable ? "visible" : null} />
                </Fragment>
                <div className="navbar">
                    <NavbarItems toggleMenu={this.toggleMenu} />
                </div>

            </Fragment>
        );
    }
}

export default Navbar;