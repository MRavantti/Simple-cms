import React, { Component, Fragment } from 'react';

import './style.css'

class CreateUser extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            email: "",
            password: "",
            passwordConfirm: "",
            passwordTryMatch: false,
            passwordIsMatch: false,
        }
    }

    addUser = () => {
        const api = `http://localhost:5000/api/user`

        const options = {
            method: 'Post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Username: this.state.username,
                Email: this.state.email,
                Password: this.state.password,
            })
        }


        fetch(api, options)
            .then(res => {
                window.location.reload();
            })
    }

    changeHandler = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleSubmit = e => {
        e.preventDefault();
        if (this.state.password === this.state.passwordConfirm) {
            this.addUser();
        }
        else {
            this.setState({ passwordTryMatch: true, passwordIsMatch: false})

        }
    }

    render() {
        const { username, email, password, passwordConfirm, passwordTryMatch, passwordIsMatch } = this.state;

        return (
            <Fragment>
                <h4>Create new user</h4>
                <form className="add-new-user-forms" onSubmit={this.handleSubmit}>


                    <label>
                        <p className="label">username:</p>
                        <input
                            type="text"
                            name="username"
                            value={username}
                            onChange={this.changeHandler}
                        />
                    </label>
                    <label>
                        <p className="label">email:</p>
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={this.changeHandler}
                        />
                    </label>
                    <label>
                        <p className="label">password:</p>
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={this.changeHandler}
                        />
                    </label>
                    <label>
                        <p className="label">confirm password:</p>
                        <input
                            type="password"
                            name="passwordConfirm"
                            value={passwordConfirm}
                            onChange={this.changeHandler}
                        />
                    </label>
                    {
                        passwordTryMatch === true
                            ? <Fragment>
                                {
                                    passwordIsMatch === false
                                        ? <p>Password must match!</p>
                                        : null
                                }
                            </Fragment>
                            : null
                    }
                    <input className="submit" type="submit" value="Submit" />
                </form>
            </Fragment>
        )
    }
}

export default CreateUser;