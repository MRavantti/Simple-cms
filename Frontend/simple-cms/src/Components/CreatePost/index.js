import React, { Component, Fragment } from 'react';

class CreatePost extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pageName: this.props.pageName,
            postCategory: "",
            postTitle: "",
            bodyText: "",
            postImageThumbnail: "",
        }
    }

    componentDidMount() {
        this.setState({ pages: this.props.pages })
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

    fileSelectedHandler = e => {
        this.setState({ [e.target.name]: e.target.files[0].name })
    }

    render() {
        
        const { pageName, postTitle, bodyText } = this.state;
        const { pages } = this.props;

        return (
            <Fragment>
                <form className="add-new-page-forms" onSubmit={this.handleSubmit}>
                    {
                        pageName !== undefined
                            ? <h4>Create new post for {pageName}</h4>
                            : <h4>Create new post</h4>
                    }

                    {
                        pageName === undefined
                            ? <label>
                                Select page:
                                <select name="pageName" onChange={this.changeHandler}>
                                    <option value="">--- Select an option ---</option>
                                    <option value="Home">Home</option>
                                    {
                                        pages.map((page, key) => {
                                            return <option key={key} value={page.page_name} >{page.page_name}</option>
                                        })
                                    }
                                </select>
                            </label>
                            : <label>
                                Post category:
                                        <input
                                    type="text"
                                    name="postCategory"
                                    value={pageName}
                                    onChange={this.changeHandler}
                                    readOnly
                                />
                            </label>
                    }

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
                            type="file"
                            name="postImageThumbnail"
                            onChange={this.fileSelectedHandler}
                        />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </Fragment>
        )
    }
}

export default CreatePost;