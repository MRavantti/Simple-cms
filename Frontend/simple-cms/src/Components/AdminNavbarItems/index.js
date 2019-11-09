import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import './style.css';

import Logo from '../../images/example-logo.svg'
import BurgerIcon from '../../images/burger-icon.svg'

class AdminNavbarItems extends Component {
    render() {    
        const { toggleMenu } = this.props
        
        return (
            <Fragment>
                <div className="logo">
                    <Link to="/"><img src={Logo} alt="logo" /></Link>
                </div>
                <div className="burger-menu">
                    <img onClick={toggleMenu} src={BurgerIcon} alt="Burger Icon" />
                    <p>Menu</p>
                </div>
            </Fragment>
        )
    }
}

export default AdminNavbarItems;