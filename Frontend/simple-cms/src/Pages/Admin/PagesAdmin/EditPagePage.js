import React, { Component, Fragment } from 'react';

import '../../style.css'
import AdminNavbar from '../../../Components/AdminNavbar';
import CreatePost from '../../../Components/CreatePost';
import BackButton from '../../../Components/BackButton';
import LinkButton from '../../../Components/LinkButton';
import Button from '../../../Components/Button';

class EditPagePage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            homePagePosts: [],
            page: [],
            pageId: "",
            pageName: "",
            changePageName: false,
            CreateNewPost: false,
        }
    }

    componentDidMount() {
        const { id } = this.props.match.params;
        this.getPageByKey(id);
        this.getHomePagePosts();
        this.setState({
            pageId: id,
        })
    }

    delete = (type, id) => {
        if (window.confirm("Are you sure?")) {

            const api = `http://localhost:5000/api/${type}/${id}`;

            const options = {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            }

            fetch(api, options)
                .then(() => { window.location.reload(); })
        }
    }

    updatePageName = (id) => {
        const api = `http://localhost:5000/api/page/${id}`;

        fetch(api, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                page_name: this.state.pageName,
            })
        })
            .then(() => {
                window.location.reload();
            })

    }
    getHomePagePosts = () => {
        const api = `http://localhost:5000/api/post/`;

        fetch(api)
            .then(res => res.json())
            .then(item => {
                this.setState({ homePagePosts: item });
            })
    }

    getPageByKey = (id) => {
        const api = `http://localhost:5000/api/page/${id}`;

        fetch(api)
            .then(res => res.json())
            .then(item => {
                this.setState({ page: item });
            })
    }

    changePageNameCheck = () => {
        this.setState(prevState => ({
            changePageName: !prevState.changePageName,
        }))
    }

    createNewPostCheck = () => {
        this.setState(prevState => ({
            CreateNewPost: !prevState.CreateNewPost,
        }))
    }

    handleSubmit = e => {
        e.preventDefault();
        this.updatePageName(this.state.pageId);
    }

    changeHandler = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    render() {
        const { page, changePageName, CreateNewPost, homePagePosts } = this.state
        const { params } = this.props.match;

        return (
            <Fragment>
                <AdminNavbar />
                <BackButton onClick={() => this.props.history.goBack()} />
                {
                    params.id === "Home"
                        ? <div className="posts">

                            <h1>Home</h1>

                            {
                                CreateNewPost === false
                                    ? <Fragment>
                                        <Button onClick={() => this.createNewPostCheck()} text="Create new post" backgroundColor="#008000" />
                                        {
                                            homePagePosts.filter(function (post) { return post.post_category === "Home" }).map((post, key) =>
                                                <div className="page-posts" key={key}>
                                                    <h2>{post.title}</h2>
                                                    <div className="line" />

                                                    <p>{post.body_text}</p>
                                                    <div className="action-buttons">
                                                        <LinkButton text="Edit post" link={`/admin/posts/edit-post/${post.post_id}`} backgroundColor="#262832" />
                                                        <Button onClick={() => this.delete("post", post.post_id)} text="Delete post" backgroundColor="#D72323" />
                                                    </div>
                                                </div>
                                            )
                                        }
                                    </Fragment>
                                    : <Fragment>
                                        <Button onClick={() => this.createNewPostCheck()} text="Cancel" backgroundColor="#262933" />
                                        <CreatePost pageName={"Home"} />
                                    </Fragment>
                            }
                        </div>

                        : <Fragment>
                            {
                                page.map((page, key) =>
                                    <div className="posts" key={key}>
                                        {
                                            changePageName === true

                                                ? <Fragment>
                                                    <form className="edit-name-form" onSubmit={this.handleSubmit}>
                                                        <label>
                                                            Enter new page name:
                                                    <input
                                                                type="text"
                                                                name="pageName"
                                                                placeholder="Enter page name..."
                                                                defaultValue={page.page_name}
                                                                onChange={this.changeHandler}
                                                            />
                                                        </label>
                                                        <input className="submit" type="submit" value="Save" />
                                                    </form>
                                                    <Button onClick={() => this.changePageNameCheck()} text="Cancel" backgroundColor="#262933" />
                                                </Fragment>

                                                : <Fragment>
                                                    <h1>{page.page_name}</h1>
                                                    <Button onClick={() => this.changePageNameCheck()} text="Change name of this page" backgroundColor="#262933" />

                                                </Fragment>
                                        }
                                        {
                                            CreateNewPost === false
                                                ? <Fragment>
                                                    <div className="page-button-container">
                                                        <Button onClick={() => this.createNewPostCheck()} text="Add new post" backgroundColor="#008000" />
                                                    </div>
                                                    {
                                                        page.posts.map((post, postKey) =>
                                                            post === null

                                                                ? <p key={postKey}>You do not have any posts for this page</p>

                                                                : <div className="page-posts" key={postKey}>
                                                                    <h2>{post.title}</h2>
                                                                    <div className="line"></div>

                                                                    <p>{post.body_text}</p>
                                                                    <div className="action-buttons">
                                                                        <LinkButton link={`/admin/posts/edit-post/${post.post_id}`} text="Edit post" backgroundColor="#262933" />
                                                                        <Button onClick={() => this.delete("post", post.post_id)} text="Delete post" backgroundColor="#D72323" />
                                                                    </div>
                                                                </div>
                                                        )
                                                    }
                                                </Fragment>

                                                : <Fragment>
                                                    <div className="page-button-container">
                                                        <Button onClick={() => this.createNewPostCheck()} text="Cancel" backgroundColor="#262933" />
                                                    </div>
                                                    <CreatePost pageName={page.page_name} />
                                                </Fragment>
                                        }
                                        <div className="action-buttons">
                                            <Button onClick={() => this.delete("page", page.page_id)} text="Delete page" backgroundColor="#D72323" />
                                        </div>
                                    </div>
                                )
                            }

                        </Fragment>
                }

            </Fragment>
        );
    }
}

export default EditPagePage;