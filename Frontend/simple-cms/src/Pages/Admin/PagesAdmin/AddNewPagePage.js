import React, { Component, Fragment } from 'react';

import '../../style.css'
import AdminNavbar from '../../../Components/AdminNavbar';

class AddNewPagePage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pageName: "",
            postCategory: "",
            postTitle: "",
            preamble: "",
            bodyText: "",
            postImageThumbnail: "",
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
    }

    addPost = () => {
        const api = `http://localhost:5000/api/post`

        fetch(api, {
            method: 'Post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Post_category: this.state.pageName,
                Title: this.state.postTitle,
                Preamble: this.state.preamble,
                Body_text: this.state.bodyText,
                Post_image_thumbnail: this.state.postImageThumbnail
            })
        })
    }

    changeHandler = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleSubmit = e => {
        e.preventDefault();
        this.addPage();
        this.addPost();
        this.props.history.push(`/admin/pages`);

    }

    render() {
        const { pageName, postTitle, preamble, bodyText, postImageThumbnail } = this.state;

        return (
            <Fragment>
                <AdminNavbar />
                <h1>Add new page</h1>

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
                    <h4>Create your first post for {pageName}</h4>
                    <label>
                        Post category:
                        <input
                            type="text"
                            name="postCategory"
                            value={pageName}
                            onChange={this.changeHandler}
                            readOnly
                        />
                    </label>
                    <label>
                        Title:
                        <input
                            type="text"
                            name="postTitle"
                            value={postTitle}
                            onChange={this.changeHandler}
                        />
                    </label>
                    <label>
                        preamble:
                        <input
                            type="text"
                            name="preamble"
                            value={preamble}
                            onChange={this.changeHandler}
                        />
                    </label>
                    <label>
                        Body text:
                        <textarea
                            type="text"
                            name="bodyText"
                            value={bodyText}
                            onChange={this.changeHandler}
                        />
                    </label>
                    <label>
                        image:
                        <input
                            type="text"
                            name="postImageThumbnail"
                            value={postImageThumbnail}
                            onChange={this.changeHandler}
                        />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </Fragment>
        );
    }
}

export default AddNewPagePage;