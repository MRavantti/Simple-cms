import React, {Component, Fragment} from 'react';

import backArrow from '../../images/arrow.svg'

class BackButton extends Component {
render() {
    return (
        <Fragment>
            <img src={backArrow} onClick={this.props.onClick} alt="Back button" />            
        </Fragment>
    )
}
}

export default BackButton;