import React, { Component, Fragment } from 'react';

import AdminNavBar from '../../../Components/AdminNavbar';
import EditUser from '../../../Components/EditUser';
import BackButton from '../../../Components/BackButton';

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

    deleteUser = (id) => {
        if (window.confirm("Are you sure?")) {

            const api = `http://localhost:5000/api/user/${id}`;

            const options = {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            }
            fetch(api, options)
                .then(() => { this.props.history.push('/admin/users/'); })
        }
    }

    render() {
        const { user } = this.state
        return (
            <Fragment>
                <AdminNavBar />
                <BackButton onClick={() => this.props.history.goBack()} />
                <EditUser user={user} id={user.id} onClick={() => this.deleteUser(user.id)} />
            </Fragment>
        )
    }
}

export default EditUserPage;