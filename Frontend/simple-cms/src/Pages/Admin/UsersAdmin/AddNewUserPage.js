import React, { Component, Fragment } from 'react';

import AdminNavbar from '../../../Components/AdminNavbar';
import CreateUser from '../../../Components/CreateUser';
import BackButton from '../../../Components/BackButton';

class AddNewUserPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            userImageThumbnail: "",
        }
    }

    render() {

        return (
            <Fragment>
                <AdminNavbar />
                <BackButton onClick={() => this.props.history.goBack()} />
                <CreateUser />
            </Fragment>
        )
    }
}

export default AddNewUserPage;