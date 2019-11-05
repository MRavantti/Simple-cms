import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

import './style.css'
import CrossIcon from '../../images/cross-icon.svg'

class MobileMenu extends Component {
    state = {
        pages: []
    }

    componentDidMount() {
        this.fetchApi();
    }

    fetchApi = () => {
        const api = 'http://localhost:5000/api/page/';

        fetch(api)
            .then(res => res.json())
            .then(item => {
                this.setState({
                    pages: item
                });
            });
    };

    render() {

        const { toggleMenu, myClass } = this.props;

        return (
            <Fragment>
                <div className={`mobile-menu ${myClass}`}>
                    <img className="cross-icon" onClick={toggleMenu} src={CrossIcon} alt="Cross Icon" />

                    <div className="mobile-menu-items">
                        {this.state.pages.map((page, key) =>
                            <Link to={page.page_name} onClick={toggleMenu} key={key}>
                                <p >{page.page_name} </p>
                            </Link>
                        )}
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default MobileMenu;