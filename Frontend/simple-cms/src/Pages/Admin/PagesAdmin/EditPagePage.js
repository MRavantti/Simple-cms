import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

import '../../style.css'
import AdminNavbar from '../../../Components/AdminNavbar';
import CreatePost from '../../../Components/CreatePost';

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

    deletePost = (id) => {
        if (window.confirm("Are you sure?")) {

            const api = `http://localhost:5000/api/post/${id}`;

            fetch(api, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            })
                .then(() => {
                    window.location.reload();
                })
        }
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

    UpdatePageName = (id) => {
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

    CreateNewPostCheck = () => {
        this.setState(prevState => ({
            CreateNewPost: !prevState.CreateNewPost,
        }))
    }

    handleSubmit = e => {
        e.preventDefault();
        this.UpdatePageName(this.state.pageId);
    }

    changeHandler = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    render() {
        const { page, changePageName, pageName, CreateNewPost, homePagePosts } = this.state
        const { params } = this.props.match;

        return (
            <Fragment>
                <AdminNavbar />
                {
                    params.id === "Home"
                        ? <Fragment>
                            <h1>Home</h1>
                            <h4>Posts for this page:</h4>

                            {
                                CreateNewPost === false
                                    ? <Fragment>
                                        <button onClick={() => this.CreateNewPostCheck()}>Create new post</button>
                                        {
                                            homePagePosts.filter(function (post) { return post.post_category === "Home" }).map((post, key) => {
                                                return (<div key={key}>
                                                    <h4>{post.post_category}</h4>
                                                    <h5>{post.title}</h5>
                                                    <p>{post.body_text}</p>
                                                    <p>{post.post_image_thumbnail}</p>
                                                    <button onClick={() => this.deletePost(post.post_id)}>Delete post</button>
                                                </div>
                                                )
                                            })
                                        }
                                    </Fragment>
                                    : <Fragment>
                                        <button onClick={() => this.CreateNewPostCheck()}>Cancel</button>
                                        <CreatePost pageName={"Home"} />
                                    </Fragment>
                            }

                        </Fragment>

                        : <Fragment>
                            {
                                page.map((page, key) =>
                                    <div className="page" key={key}>
                                        {
                                            changePageName === true

                                                ? <Fragment>
                                                    <p>Old page name: "{page.page_name}"</p>
                                                    <form onSubmit={this.handleSubmit}>
                                                        <label>
                                                            Enter new page name:
                                                    <input
                                                                type="text"
                                                                name="pageName"
                                                                value={pageName}
                                                                onChange={this.changeHandler}
                                                            />
                                                        </label>
                                                        <input type="submit" value="Submit" />
                                                    </form>
                                                    <button onClick={() => this.changePageNameCheck()}>Cancel</button>
                                                </Fragment>

                                                : <Fragment>
                                                    <h1>{page.page_name}</h1>
                                                    <button onClick={() => this.changePageNameCheck()}>Change name of this page</button>
                                                </Fragment>
                                        }
                                        <h4>Posts for this page:</h4>
                                        {
                                            CreateNewPost === false
                                                ? <Fragment>
                                                    <button onClick={() => this.CreateNewPostCheck()}>Add new post</button>
                                                    {
                                                        page.posts.map((post, postKey) =>
                                                            post === null

                                                                ? <p>You do not have any posts for this page</p>

                                                                : <div key={postKey}>
                                                                    <h5>{post.title}</h5>
                                                                    <p>{post.post_image_thumbnail}</p>
                                                                    <p>{post.body_text}</p>
                                                                    <div className="page-action-list">
                                                                        <button><Link to={`/admin/posts/edit-post/${post.post_id}`}>Edit post</Link></button>
                                                                        <button onClick={() => this.deletePost(post.post_id)}>Delete post</button>
                                                                    </div>
                                                                </div>
                                                        )
                                                    }
                                                </Fragment>

                                                : <Fragment>
                                                    <button onClick={() => this.CreateNewPostCheck()}>Cancel</button>
                                                    <CreatePost pageName={page.page_name} />
                                                </Fragment>
                                        }
                                    </div>
                                )
                            }
                            <button onClick={() => this.delete("page", page.page_id)}>Delete page</button>
                        </Fragment>
                }

            </Fragment>
        );
    }
}

export default EditPagePage;