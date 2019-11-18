import React, { Component, Fragment } from 'react';

import './style.css'
import Button from '../Button';

class EditPost extends Component {
    constructor(props) {
        super(props)
        this.state = {
            postId: this.props.id,
            pageName: "",
            postCategory: "",
            postTitle: "",
            bodyText: "",
            editPageName: false,
            editTitle: false,
            editBodyText: false,
        }
    }

    getPages = () => {
        const api = 'http://localhost:5000/api/page/';

        fetch(api)
            .then(res => res.json())
            .then(item => { this.setState({ pages: item }); });
    }

    editPost = () => {
        const api = `http://localhost:5000/api/post/${this.props.id}`

        const option = {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Post_category: this.state.pageName,
                Title: this.state.postTitle,
                Body_text: this.state.bodyText,
            })
        }

        fetch(api, option)
            .then(() => { window.location.reload(); })
    }

    changePageNameChecker = () => {
        this.setState(prevState => ({
            editPageName: !prevState.editPageName
        }))
    }

    changeTitleChecker = () => {
        this.setState(prevState => ({
            editTitle: !prevState.editTitle,
        }))
    }

    changeBodyTextChecker = () => {
        this.setState(prevState => ({
            editBodyText: !prevState.editBodyText,
        }))
    }

    changeHandler = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleSubmit = e => {
        e.preventDefault();
        this.editPost();
    }


    render() {
        const { editTitle, editBodyText, editPageName } = this.state;
        const { pages, post } = this.props;

        return (
            <Fragment>
                <h1>Edit post</h1>
                <div className="edit-post-container">

                    {
                        editPageName === false
                            ? <Fragment>
                                <p>{post.post_category}</p>
                                <Button onClick={() => this.changePageNameChecker()} text="Edit" backgroundColor="#262832" />
                            </Fragment>

                            : <Fragment>

                                <form className="edit-page-name-form" onSubmit={this.handleSubmit}>
                                    <label>
                                        <p className="label">Select page:</p>
                                        <select name="pageName" ref="pageName" onChange={this.changeHandler}>
                                            <option value="">--- Select an option ---</option>
                                            <option value="Home">Home</option>
                                            {
                                                pages.map((page, key) => {
                                                    return <option key={key} value={page.page_name} >{page.page_name}</option>
                                                })
                                            }
                                        </select>
                                    </label>
                                    <input className="submit" type="submit" value="Save" />
                                </form>
                                <Button onClick={() => this.changePageNameChecker()} text="Cancel" backgroundColor="#262832" />
                            </Fragment>
                    }
                    <div className="line" />
                    {
                        editTitle === false

                            ? <Fragment>
                                <p>{post.title}</p>
                                <Button onClick={() => this.changeTitleChecker()} text="Edit" backgroundColor="#262832" />

                            </Fragment>

                            : <Fragment>

                                <form className="edit-page-name-form" onSubmit={this.handleSubmit}>

                                    <label>
                                        <p className="label">Title:</p>
                                        <input
                                            type="text"
                                            name="postTitle"
                                            defaultValue={post.title}
                                            ref="postTitle"
                                            onChange={this.changeHandler}
                                        />
                                    </label>
                                    <input className="submit" type="submit" value="Save" />
                                </form>
                                <Button onClick={() => this.changeTitleChecker()} text="Cancel" backgroundColor="#262832" />
                            </Fragment>
                    }
                    <div className="line" />
                    {
                        editBodyText === false
                            ? <Fragment>
                                {
                                    post.body_text === undefined
                                        ? <p>body text does not exist</p>
                                        : <Fragment>
                                            {
                                                post.body_text.split('\n').map((bodyText, i) => {
                                                    return <p key={i}>{bodyText}</p>
                                                })
                                            }
                                        </Fragment>
                                }
                                <Button onClick={() => this.changeBodyTextChecker()} text="edit" backgroundColor="#262832" />
                            </Fragment>

                            : <Fragment>

                                <form className="edit-page-name-form" onSubmit={this.handleSubmit}>
                                    <label>
                                        <p className="label">Body text:</p>
                                        <textarea
                                            type="text"
                                            name="bodyText"
                                            ref="bodyText"
                                            defaultValue={post.body_text}
                                            onChange={this.changeHandler}
                                        />
                                    </label>
                                    <input className="submit" type="submit" value="Save" />
                                </form>
                                <Button onClick={() => this.changeBodyTextChecker()} text="Cancel" backgroundColor="#262832" />
                            </Fragment>
                    }
                </div>
            </Fragment >
        )
    }
}

export default EditPost;