import React, { Component, Fragment } from 'react';

import AdminNavBar from '../../../Components/AdminNavbar';
import EditUser from '../../../Components/EditUser';

class EditUserPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: [],
        }
    }

    componentDidMount() {
        const { id } = this.props.match.params;
        this.getUserByKey(id)
    }
    getUserByKey = (id) => {
        const api = `http://localhost:5000/api/user/${id}`;

        fetch(api)
            .then(res => res.json())
            .then(item => {
                this.setState({ user: item });
            })
    }

    render() {
        const { user } = this.state
        return (
            <Fragment>
                <AdminNavBar />
                <EditUser user={user} id={user.id}/>
            </Fragment>
        )
    }
}

export default EditUserPage;