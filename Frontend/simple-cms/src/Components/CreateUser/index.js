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
        this.addUser();
    }

    render() {
        const { username, email, password, passwordConfirm } = this.state;

        return (
            <Fragment>
                <h4>Create new user</h4>
                <form className="add-new-user-forms" onSubmit={this.handleSubmit}>


                    <label>
                        username:
                                        <input
                            type="text"
                            name="username"
                            value={username}
                            onChange={this.changeHandler}
                        />
                    </label>
                    <label>
                        email:
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={this.changeHandler}
                        />
                    </label>
                    <label>
                        password:
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={this.changeHandler}
                        />
                    </label>
                    <label>
                        confirm password:
                        <input
                            type="password"
                            name="password"
                            value={passwordConfirm}
                            onChange={this.changeHandler}
                        />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </Fragment>
        )
    }
}

export default CreateUser;