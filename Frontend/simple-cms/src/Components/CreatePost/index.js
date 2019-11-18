import React, { Component, Fragment } from 'react';

import './style.css'

class CreatePost extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pageName: this.props.pageName,
            postCategory: "",
            postTitle: "",
            bodyText: "",
        }
    }

    componentDidMount() {
        this.setState({ pages: this.props.pages })
    }

    addPost = () => {
        const api = `http://localhost:5000/api/post`;

        fetch(api, {
            method: 'Post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Post_category: this.state.pageName,
                Title: this.state.postTitle,
                Body_text: this.state.bodyText,
            })
        })
            .then(() => {
                window.location.reload();
            })
    }

    changeHandler = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleSubmit = e => {
        e.preventDefault();
        this.addPost();
    }

    render() {

        const { pageName, postTitle, bodyText } = this.state;
        const { pages } = this.props;

        return (
            <Fragment>
                <form className="add-new-page-forms" onSubmit={this.handleSubmit}>
                    <div className="add-new-page-forms-top-title">
                        {
                            pageName !== undefined
                                ? <h4>Create new post for {pageName}</h4>
                                : <h4>Create new post</h4>
                        }
                    </div>

                    {
                        pageName === undefined
                            ? <label>
                                <p className="label">Select page:</p>
                                <select name="pageName" onChange={this.changeHandler}>
                                    <option value="">--- Select a page ---</option>
                                    <option value="Home">Home</option>
                                    {
                                        pages.map((page, key) => {
                                            return <option key={key} value={page.page_name} >{page.page_name}</option>
                                        })
                                    }
                                </select>
                            </label>
                            : <label>
                                <p className="label">Post category:</p>
                                <input
                                    type="text"
                                    name="postCategory"
                                    value={pageName}
                                    onChange={this.changeHandler}
                                    readOnly
                                />
                            </label>
                    }
                    <div className="line" />
                    <label>
                        <p className="label">Title:</p>
                        <input
                            type="text"
                            name="postTitle"
                            placeholder="Enter title..."
                            value={postTitle}
                            onChange={this.changeHandler}
                        />
                    </label>
                    <div className="line" />
                    <label>
                        <p className="label">Body text:</p>
                        <textarea
                            type="text"
                            name="bodyText"
                            placeholder="Enter body text..."
                            value={bodyText}
                            onChange={this.changeHandler}
                        />
                    </label>
                    <div className="submit-button-container">
                        <input className="submit" type="submit" value="Submit" />
                    </div>
                </form>
            </Fragment>
        )
    }
}

export default CreatePost;