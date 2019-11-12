import React, { Component, Fragment } from 'react';

import './style.css'

class EditUser extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            userImageThumbnail: "",
            editUsername: false,
            editFirstName: false,
            editLastName: false,
            editEmail: false,
            editPassword: false,
            editImage: false,
        }
    }

    editUser = () => {
        const api = `http://localhost:5000/api/user/${this.props.id}`

        const options = {
            method: 'PUT',
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
                user_image_thumbnail: this.state.userImageThumbnail,
            })
        }

        fetch(api, options)
            .then(() => { window.location.reload(); })
    }

    changeHandler = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleSubmit = e => {
        e.preventDefault();
        this.editUser();
    }

    fileSelectedHandler = e => {
        this.setState({ [e.target.name]: e.target.files[0].name })
    }

    editUsernameChecker = () => {
        this.setState(prevState => ({
            editUsername: !prevState.editUsername,
        }))
    }

    editFirstNameChecker = () => {
        this.setState(prevState => ({
            editFirstName: !prevState.editFirstName,
        }))
    }

    editLastNameChecker = () => {
        this.setState(prevState => ({
            editLastName: !prevState.editLastName,
        }))
    }

    editEmailChecker = () => {
        this.setState(prevState => ({
            editEmail: !prevState.editEmail,
        }))
    }

    editImageChecker = () => {
        this.setState(prevState => ({
            editImage: !prevState.editImage,
        }))
    }

    editPasswordChecker = () => {
        this.setState(prevState => ({
            editPassword: !prevState.editPassword,
        }))
    }


    render() {
        const { password, userImageThumbnail, editUsername, editFirstName, editLastName, editEmail, editImage, editPassword } = this.state;
        const { user } = this.props;

        return (
            <Fragment>
                {
                    editUsername === false
                        ? <Fragment>
                            <h1>{user.username}</h1>
                            <button onClick={() => this.editUsernameChecker()}>Change username</button>
                        </Fragment>
                        : <Fragment>
                            <button onClick={() => this.editUsernameChecker()}>Cancel</button>
                            <form className="add-new-user-forms" onSubmit={this.handleSubmit}>
                                <label>
                                    username:
                                    <input
                                        type="text"
                                        name="username"
                                        defaultValue={user.username}
                                        onChange={this.changeHandler}
                                    />
                                </label>
                                <input type="submit" value="Submit" />
                            </form>
                        </Fragment>
                }
                {
                    editFirstName === false
                        ? <Fragment>
                            <p>First name: {user.first_name}</p>
                            <button onClick={() => this.editFirstNameChecker()}>Change first name</button>
                        </Fragment>
                        : <Fragment>
                            <button onClick={() => this.editFirstNameChecker()}>Cancel</button>
                            <form className="add-new-user-forms" onSubmit={this.handleSubmit}>
                                <label>
                                    First name:
                                    <input
                                        type="text"
                                        name="firstName"
                                        defaultValue={user.first_name}
                                        onChange={this.changeHandler}
                                    />
                                </label>
                                <input type="submit" value="Submit" />
                            </form>
                        </Fragment>
                }

                {
                    editLastName === false
                        ? <Fragment>
                            <p>Last name: {user.last_name}</p>
                            <button onClick={() => this.editLastNameChecker()}>Change last name</button>
                        </Fragment>
                        : <Fragment>
                            <button onClick={() => this.editLastNameChecker()}>Cancel</button>
                            <form className="add-new-user-forms" onSubmit={this.handleSubmit}>
                                <label>
                                    Last name:
                                    <input
                                        type="text"
                                        name="lastName"
                                        defaultValue={user.last_name}
                                        onChange={this.changeHandler}
                                    />
                                </label>
                                <input type="submit" value="Submit" />
                            </form>
                        </Fragment>
                }

                {
                    editEmail === false
                        ? <Fragment>
                            <p>Email: {user.email}</p>
                            <button onClick={() => this.editEmailChecker()}>Change email</button>
                        </Fragment>
                        : <Fragment>
                            <button onClick={() => this.editEmailChecker()}>Cancel</button>
                            <form className="add-new-user-forms" onSubmit={this.handleSubmit}>
                                <label>
                                    email:
                                    <input
                                        type="email"
                                        name="email"
                                        defaultValue={user.email}
                                        onChange={this.changeHandler}
                                    />
                                </label>
                                <input type="submit" value="Submit" />
                            </form>
                        </Fragment>
                }

                {
                    editPassword === false
                        ? <Fragment>
                            <p>Change password</p>
                            <button onClick={() => this.editPasswordChecker()}>Change password</button>
                        </Fragment>
                        : <Fragment>
                            <button onClick={() => this.editPasswordChecker()}>Cancel</button>
                            <form className="add-new-user-forms" onSubmit={this.handleSubmit}>
                                <label>
                                    password:
                                    <input
                                        type="password"
                                        name="password"
                                        value={password}
                                        onChange={this.changeHandler}
                                    />
                                </label>
                                <input type="submit" value="Submit" />
                            </form>
                        </Fragment>
                }
                {
                    editImage === false
                        ? <Fragment>
                            <p>{user.user_image_thumbnail}</p>
                            <button onClick={() => this.editImageChecker()}>Change Image</button>
                        </Fragment>
                        : <Fragment>
                            <button onClick={() => this.editImageChecker()}>Cancel</button>
                            <form className="add-new-user-forms" onSubmit={this.handleSubmit}>
                                <label>
                                    Profile image:
                                    <input
                                        type="file"
                                        name="userImageThumbnail"
                                        value={userImageThumbnail}
                                        onChange={this.fileSelectedHandler}
                                    />
                                </label>
                                <input type="submit" value="Submit" />
                            </form>
                        </Fragment>
                }
            </Fragment >
        )
    }
}

export default EditUser;