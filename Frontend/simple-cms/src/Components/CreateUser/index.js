import React, { Component, Fragment } from 'react';

class CreateUser extends Component {
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

    addUser = () => {
        const api = `http://localhost:5000/api/user`


        fetch(api, {
            method: 'Post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Username: this.state.username,
                First_name: this.state.firstName,
                Last_name: this.state.lastName,
                Email: this.state.email,
                Password: this.state.password,
                User_image_thumbnail: this.state.userImageThumbnail
            })
        })
            .then(res => {
                this.props.history.goBack();
                window.location.reload();
            })
    }

    render() {

        return (
            <Fragment>
            </Fragment>
        )
    }
}

export default CreateUser;