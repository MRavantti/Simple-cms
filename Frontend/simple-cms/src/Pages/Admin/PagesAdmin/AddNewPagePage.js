import React, { Component, Fragment } from 'react';

import '../../style.css'
import AdminNavbar from '../../../Components/AdminNavbar';
import Button from '../../../Components/Button';
import CreatePost from '../../../Components/CreatePost'
import BackButton from '../../../Components/BackButton';

class AddNewPagePage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pageName: "",
            pageCreated: false,
            createNewPost: false,
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
            .then(() => {
                this.setState(prevState => ({
                    pageCreated: !prevState.pageCreated,
                }))
            })
    }

    changeHandler = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleSubmit = e => {
        e.preventDefault();
        this.addPage();
    }

    CreateNewPostCheck = () => {
        this.setState(prevState => ({
            createNewPost: !prevState.createNewPost,
        }))
    }

    render() {
        const { pageName, pageCreated, createNewPost } = this.state;
        

        return (
            <Fragment>
                <AdminNavbar />
                {
                    pageCreated === true
                        ? <Fragment>
                            <h1>{pageName}</h1>
                            {
                                createNewPost === true
                                    ? <Fragment>
                                        <CreatePost pageName={pageName} />
                                        <Button onClick={() => this.CreateNewPostCheck()} text="Cancel" backgroundColor="#262933" />
                                    </Fragment>

                                    : <Fragment>
                                        <p>You do not yet have any post on this page</p>
                                        <p>Press "Add new post" to create a new post for this page</p>
                                        <Button onClick={() => this.CreateNewPostCheck()} text="Add new post" backgroundColor="#008000" />

                                    </Fragment>
                            }
                        </Fragment>
                        : <Fragment>
                            <h1>Add new page</h1>
                            <BackButton onClick={() => this.props.history.goBack()} />

                            <form className="add-new-page-forms" onSubmit={this.handleSubmit}>
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
                }
            </Fragment>
        );
    }
}

export default AddNewPagePage;