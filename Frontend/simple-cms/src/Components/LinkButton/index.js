import React, { Component, Fragment } from 'react';

import './style.css'
import { Link } from 'react-router-dom';

class LinkButton extends Component {
    render() {
        const { link, text, backgroundColor } = this.props
        console.log(this.props);

        return (
            <Fragment>
                <button className="link-button" style={{ backgroundColor: backgroundColor }}><Link to={link}>{text}</Link></button>
            </Fragment>
        )
    }
}

export default LinkButton;