import React, { Component, Fragment } from 'react';

import './style.css';
import Button from '../Button';

class EditUser extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            oldPassword: "",
            newPassword: "",
            confirmNewPassword: "",
            passwordTryMatch: false,
            passwordMatch: false,
            editUsername: false,
            editFirstName: false,
            editLastName: false,
            editEmail: false,
            editPassword: false,
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
            })
        }

        fetch(api, options)
            .then(() => { window.location.reload(); })
    }

    ChangePassword = () => {
        const api = `http://localhost:5000/api/user/${this.props.id}`

        const options = {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Password: this.state.newPassword,
            })
        }

        fetch(api, options)
            .then(() => { window.location.reload(); })
    }

    handleSubmitChangePassword = e => {
        e.preventDefault();
        if (this.state.oldPassword === this.props.user.password) {
            if (this.state.newPassword === this.state.confirmNewPassword) {
                this.ChangePassword();
            }
        }
        if (this.state.oldPassword !== this.props.user.password) {
            this.setState({ passwordTryMatch: true });
        }
        if (this.state.newPassword !== this.state.confirmNewPassword) {
            this.setState({ passwordTryMatch: true, passwordMatch: true })
        }
    }

    changeHandler = e => {
        this.setState({ [e.target.name]: e.target.value, passwordTryMatch: false, passwordMatch: false })
    }

    handleSubmit = e => {
        e.preventDefault();
        this.editUser();
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

    editPasswordChecker = () => {
        this.setState(prevState => ({
            editPassword: !prevState.editPassword,
        }))
    }


    render() {
        const { oldPasswordCheck, editUsername, editFirstName, editLastName, editEmail, editPassword, oldPassword, newPassword, confirmNewPassword, passwordTryMatch, passwordMatch } = this.state;
        const { user } = this.props;

        console.log(passwordMatch);


        return (
            <Fragment>
                <h1>Edit user</h1>
                <div className="forms-container">
                    {
                        editUsername === false
                            ? <Fragment>
                                <h1>{user.username}</h1>
                                <Button onClick={() => this.editUsernameChecker()} text="Change username" backgroundColor="#262832" />
                            </Fragment>
                            : <Fragment>
                                <form className="forms" onSubmit={this.handleSubmit}>
                                    <label>
                                        username:
                                    <input
                                            type="text"
                                            name="username"
                                            placeholder="Username"
                                            defaultValue={user.username}
                                            onChange={this.changeHandler}
                                        />
                                    </label>
                                    <input className="submit" type="submit" value="Submit" />
                                </form>
                                <Button onClick={() => this.editUsernameChecker()} text="Cancel" backgroundColor="#262832" />
                            </Fragment>
                    }
                    <div className="line" />
                    {
                        editFirstName === false
                            ? <Fragment>
                                <p>First name: {user.first_name}</p>
                                <Button onClick={() => this.editFirstNameChecker()} text="Change first name" backgroundColor="#262832" />
                            </Fragment>
                            : <Fragment>
                                <form className="forms" onSubmit={this.handleSubmit}>
                                    <label>
                                        First name:
                                    <input
                                            type="text"
                                            name="firstName"
                                            placeholder="First name...."
                                            defaultValue={user.first_name}
                                            onChange={this.changeHandler}
                                        />
                                    </label>
                                    <input className="submit" type="submit" value="Submit" />
                                </form>
                                <Button onClick={() => this.editFirstNameChecker()} text="Cancel" backgroundColor="#262832" />
                            </Fragment>
                    }
                    <div className="line" />
                    {
                        editLastName === false
                            ? <Fragment>
                                <p>Last name: {user.last_name}</p>
                                <Button onClick={() => this.editLastNameChecker()} text="Edit last name" backgroundColor="#262832" />
                            </Fragment>
                            : <Fragment>
                                <form className="forms" onSubmit={this.handleSubmit}>
                                    <label>
                                        Last name:
                                    <input
                                            type="text"
                                            name="lastName"
                                            placeholder="Last name...."
                                            defaultValue={user.last_name}
                                            onChange={this.changeHandler}
                                        />
                                    </label>
                                    <input className="submit" type="submit" value="Submit" />
                                </form>
                                <Button onClick={() => this.editLastNameChecker()} text="Cancel" backgroundColor="#262832" />
                            </Fragment>
                    }
                    <div className="line" />
                    {
                        editEmail === false
                            ? <Fragment>
                                <p>Email: {user.email}</p>
                                <Button onClick={() => this.editEmailChecker()} text="Change email" backgroundColor="#262832" />

                            </Fragment>
                            : <Fragment>
                                <form className="forms" onSubmit={this.handleSubmit}>
                                    <label>
                                        <p>Email: </p>

                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="Email@example.com..."
                                            defaultValue={user.email}
                                            onChange={this.changeHandler}
                                        />
                                    </label>
                                    <input className="submit" type="submit" value="Submit" />
                                </form>
                                <Button onClick={() => this.editEmailChecker()} text="Cancel" backgroundColor="#262832" />
                            </Fragment>
                    }
                    <div className="line" />
                    {
                        editPassword === false
                            ? <Fragment>
                                <p>Change password</p>
                                <Button onClick={() => this.editPasswordChecker()} text="Change password" backgroundColor="#262832" />
                            </Fragment>
                            : <Fragment>
                                {
                                    passwordTryMatch === true
                                        ? oldPasswordCheck === false
                                            ? <p>Incorrect password</p>
                                            : null
                                        : null
                                }
                                {
                                    passwordTryMatch === true
                                        ? passwordMatch === true
                                            ? <p>Password did not match</p>
                                            : null
                                        : null
                                }
                                <form className="forms" onSubmit={this.handleSubmitChangePassword}>
                                    <label>
                                        <p>Old password: </p>
                                        <input
                                            type="password"
                                            name="oldPassword"
                                            placeholder="***"
                                            value={oldPassword}
                                            onChange={this.changeHandler}
                                        />
                                    </label>
                                    <label>
                                        <p>New password: </p>
                                        <input
                                            type="password"
                                            name="newPassword"
                                            placeholder="***"
                                            value={newPassword}
                                            onChange={this.changeHandler}
                                        />
                                    </label>
                                    <label>
                                        <p>Confirm password: </p>
                                        <input
                                            type="password"
                                            name="confirmNewPassword"
                                            placeholder="***"
                                            value={confirmNewPassword}
                                            onChange={this.changeHandler}
                                        />
                                    </label>
                                    <input className="submit" type="submit" value="Submit" />
                                </form>
                                <Button onClick={() => this.editPasswordChecker()} text="Cancel" backgroundColor="#262832" />
                            </Fragment>
                    }
                    <div className="action-button">
                        <Button onClick={this.props.onClick} text="Delete user" backgroundColor="#D72323" />
                    </div>

                </div >
            </Fragment>
        )
    }
}

export default EditUser;