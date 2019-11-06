import React, { Component, Fragment } from 'react';

import AdminNavbar from '../Components/AdminNavbar';

class AddNewpPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pageName: "",
        }
    }

    addPage = () => {
        const api = `http://localhost:5000/api/page`

        fetch(api, {
            method: 'Post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Page_name: this.state.pageName,
            })
        })

        this.props.history.push(`/admin/page/${this.state.pageName}`);
    }

    changeHandler = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleSubmit = e => {
        e.preventDefault();
        this.addPage();
    }

    render() {
        const { pageName } = this.state.pageName;
        return (
            <Fragment>
                <AdminNavbar />
                <h1>Add new page</h1>

                <form onSubmit={this.handleSubmit}>
                    <label>
                        Enter page name:
                        <input
                            type="text"
                            name="pageName"
                            value={pageName}
                            onChange={this.changeHandler}
                        />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </Fragment>
        );
    }
}

export default AddNewpPage;