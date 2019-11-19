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
            pages: [],
            pageName: "",
            heroText: "",
            pageCreated: false,
            createNewPost: false,
        }
    }

    componentDidMount() {
        this.getPages();
    }

    addPage = () => {
        const api = `http://localhost:5000/api/page`
        const options = {
            method: 'Post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Page_name: this.state.pageName,
                Hero_text: this.state.heroText,
            })
        }

        fetch(api, options)
            .then(() => {
                this.setState(prevState => ({ pageCreated: !prevState.pageCreated, }))
            })
    }

    getPages = () => {
        const api = `http://localhost:5000/api/page/`;

        fetch(api)
            .then(res => res.json())
            .then(item => { this.setState({ pages: item }); })
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
        const { pageName, pageCreated, createNewPost, heroText, pages } = this.state;


        return (
            <Fragment>
                <AdminNavbar />
                <div className="posts">
                {
                    pageCreated === true
                        ? <Fragment>
                            <h1>{pageName}</h1>
                            {
                                createNewPost === true
                                    ? <Fragment>
                                        <CreatePost pageName={pageName} pages={pages} />
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
                                    <p className="label">Enter page name:</p>
                                    <input
                                        type="text"
                                        name="pageName"
                                        placeholder="enter page name..."
                                        value={pageName}
                                        onChange={this.changeHandler}
                                    />
                                </label>
                                <label>
                                    <p className="label">Enter hero text:</p>
                                    <textarea
                                        type="text"
                                        name="heroText"
                                        placeholder="enter hero text..."
                                        value={heroText}
                                        onChange={this.changeHandler}
                                    />
                                </label>
                                <input className="submit" type="submit" value="Submit" />
                            </form>
                        </Fragment>
                }
                </div>
            </Fragment>
        );
    }
}

export default AddNewPagePage;