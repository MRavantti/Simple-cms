import React, { Component, Fragment } from 'react';

class CreatePost extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pageName: this.props.pageName,
            postCategory: "",
            postTitle: "",
            preamble: "",
            bodyText: "",
            postImageThumbnail: "",
        }
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
        .then(() => {
            window.location.reload();
            this.props.history.push(`admin/pages/edit-page/${this.state.pageName}`);
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
        const { pageName, postTitle, preamble, bodyText, postImageThumbnail } = this.state;

        return (
            <Fragment>
                <form className="add-new-page-forms" onSubmit={this.handleSubmit}>
                    <h4>Create post for {pageName}</h4>
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
        )
    }
}

export default CreatePost;