import React, { Component, Fragment } from 'react';

class EditPost extends Component {
    constructor(props) {
        super(props)
        this.state = {
            postId: this.props.id,
            pageName: "",
            postCategory: "",
            postTitle: "",
            bodyText: "",
            postImageThumbnail: "",
            editPageName: false,
            editTitle: false,
            editBodyText: false,
            editImage: false,
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
                Post_image_thumbnail: this.state.postImageThumbnail
            })
        }

        fetch(api, option)
            .then(() => { window.location.reload(); })
    }

    changePageNameChecker = () => { this.setState(prevState => ({ editPageName: !prevState.editPageName })) }

    changeTitleChecker = () => { this.setState(prevState => ({ editTitle: !prevState.editTitle, })) }

    changeBodyTextChecker = () => { this.setState(prevState => ({ editBodyText: !prevState.editBodyText, })) }

    changeEditImageChecker = () => { this.setState(prevState => ({ editImage: !prevState.editImage, })) }

    editPageNameHandler = () => { this.setState({ pageName: this.refs.pageName.value }) }

    editBodyTextHandler = () => { this.setState({ bodyText: this.refs.bodyText.value }) }

    editTitleHandler = () => { this.setState({ postTitle: this.refs.postTitle.value }) }

    fileSelectedHandler = e => { this.setState({ [e.target.name]: e.target.files[0].name }) }

    handleSubmit = e => {
        e.preventDefault();
        this.editPost();
    }


    render() {
        const { editImage, editTitle, editBodyText, editPageName } = this.state;
        const { pages, post } = this.props;

        return (
            <Fragment>
                <h4>Create new post</h4>
                {
                    editPageName === false
                        ? <Fragment>
                            <p>{post.post_category}</p>
                            <button onClick={() => this.changePageNameChecker()}>Edit</button>
                        </Fragment>

                        : <Fragment>
                            <button onClick={() => this.changePageNameChecker()}>Cancel</button>

                            <form className="edit-page-name-form" onSubmit={this.handleSubmit}>
                                <label>
                                    Select page:
                                <select name="pageName" ref="pageName" onChange={this.editPageNameHandler}>
                                        <option value="">--- Select an option ---</option>
                                        <option value="Home">Home</option>
                                        {
                                            pages.map((page, key) => {
                                                return <option key={key} value={page.page_name} >{page.page_name}</option>
                                            })
                                        }
                                    </select>
                                </label>
                                <input type="submit" value="Submit" />
                            </form>
                        </Fragment>
                }
                {
                    editTitle === false

                        ? <Fragment>
                            <p>{post.title}</p>
                            <button onClick={() => this.changeTitleChecker()}>Edit</button>
                        </Fragment>

                        : <Fragment>
                            <button onClick={() => this.changeTitleChecker()}>Cancel</button>

                            <form className="edit-page-name-form" onSubmit={this.handleSubmit}>

                                <label>
                                    Title:
                                    <input
                                        type="text"
                                        name="postTitle"
                                        defaultValue={post.title}
                                        ref="postTitle"
                                        onChange={this.editTitleHandler}
                                    />
                                </label>
                                <input type="submit" value="Submit" />
                            </form>
                        </Fragment>
                }
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

                            <button onClick={() => this.changeBodyTextChecker()}>Edit</button>
                        </Fragment>

                        : <Fragment>
                            <button onClick={() => this.changeBodyTextChecker()}>Cancel</button>

                            <form className="edit-page-name-form" onSubmit={this.handleSubmit}>
                                <label>
                                    Body text:
                                    <textarea
                                        type="text"
                                        name="bodyText"
                                        ref="bodyText"
                                        defaultValue={post.body_text}
                                        onChange={this.editBodyTextHandler}
                                    />
                                </label>
                                <input type="submit" value="Submit" />
                            </form>
                        </Fragment>
                }
                {
                    editImage === false
                        ? <Fragment>
                            <p>{post.post_image_thumbnail}</p>
                            <button onClick={() => this.changeEditImageChecker()}>Edit</button>
                        </Fragment>

                        : <Fragment>
                            <button onClick={() => this.changeEditImageChecker()}>Cancel</button>
                            <form className="edit-page-name-form" onSubmit={this.handleSubmit}>
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
                }
            </Fragment >
        )
    }
}

export default EditPost;