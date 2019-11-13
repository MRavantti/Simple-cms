import React, { Component, Fragment } from 'react';

import './style.css'

class Button extends Component {
    render() {
        const { text, onClick, backgroundColor } = this.props
        console.log(this.props);

        return (
            <Fragment>
                <button onClick={onClick} className="button" style={{backgroundColor:backgroundColor}}>{text}</button>
            </Fragment>
        )
    }
}

export default Button;