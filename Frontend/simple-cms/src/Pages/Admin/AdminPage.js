import React, { Component, Fragment } from 'react';

import '../style.css'
import { Link } from 'react-router-dom';

import AdminNavbar from '../../Components/AdminNavbar'
import CreatePost from '../../Components/CreatePost';

class AdminPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pages: [],
            posts: [],
            createNewPost: false,
            pageName: "",
            post_category: "",
            title: "",
            body_text: "",
            post_image_thumbnail: "",
        }
    }

    componentDidMount() {
        this.fetchPages();
        this.fetchPosts();
    }

    fetchPages = () => {
        const api = 'http://localhost:5000/api/page/';

        fetch(api)
            .then(res => res.json())
            .then(item => {
                this.setState({
                    pages: item
                });
            });
    }

    fetchPosts = () => {
        const api = 'http://localhost:5000/api/post/';

        fetch(api)
            .then(res => res.json())
            .then(item => {
                this.setState({
                    posts: item
                });
            });
    }

    delete = (type, id) => {
        if (window.confirm("Are you sure?")) {

            const api = `http://localhost:5000/api/${type}/${id}`;

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

    CreateNewPostCheck = () => {
        this.setState(prevState => ({
            createNewPost: !prevState.createNewPost,
        }))
    }

    render() {

        const { params } = this.props.match;
        const { pages, posts, createNewPost } = this.state

        return (
            <Fragment>
                <AdminNavbar />
                {
                    params.admin === "pages"
                        ? <Fragment>
                            <h1>{params.admin}</h1>
                            <button><Link to="pages/add-page">Add a new page</Link></button>
                            {
                                pages.length === 0
                                    ? <h3>You do not have any pages yet</h3>
                                    : <Fragment>
                                        {
                                            pages.map((page, key) =>
                                                <div className="page" key={key}>

                                                    <h4>{page.page_name} </h4>

                                                    <div className="page-action-list">
                                                        <button><Link to={`/admin/pages/edit-page/${page.page_id}`}>Edit page</Link></button>
                                                        <button onClick={() => this.delete("page", page.page_id)}>Delete page</button>
                                                    </div>

                                                    {
                                                        page.posts.map((post, postKey) =>
                                                            post === null
                                                                ? <div key={postKey}> <p>You do not have any posts for this page yet</p></div>
                                                                : <div key={postKey}>
                                                                    <h5>{post.title}</h5>
                                                                    <p>{post.post_image_thumbnail}</p>
                                                                    <p>{post.preamble}</p>
                                                                    <p>{post.body_text}</p>
                                                                </div>
                                                        )
                                                    }
                                                </div>
                                            )
                                        }
                                    </Fragment>
                            }
                        </Fragment>

                        : params.admin === "posts"
                            ? <Fragment>
                                <p>Would you like to add a post?</p>
                                {
                                    createNewPost === false

                                        ? <Fragment>
                                            <button onClick={() => this.CreateNewPostCheck()}>Add new post</button>
                                            {
                                                posts.length === 0
                                                    ? <h3>You do not have any posts yet</h3>
                                                    : <Fragment>
                                                        {
                                                            posts.map((post, key) =>
                                                                <div className="page" key={key}>
                                                                    {
                                                                        post === null
                                                                            ? <p>You do not have any posts yet</p>
                                                                            : <div key={key}>
                                                                                <h4>Title: {post.title}</h4>
                                                                                <h5>Page: {post.post_category}</h5>
                                                                                {
                                                                                    post.body_text.split('\n').map((bodyText, i) => {
                                                                                        return <p key={i}>{bodyText}</p>
                                                                                    })
                                                                                }
                                                                            </div>
                                                                    }
                                                                    <div className="page-action-list">
                                                                        <button><Link to={`/admin/posts/edit-post/${post.post_id}`}>Edit post</Link></button>
                                                                        <button onClick={() => this.delete("post", post.post_id)}>Delete post</button>
                                                                    </div>
                                                                </div>
                                                            )
                                                        }
                                                    </Fragment>
                                            }
                                        </Fragment>

                                        : <Fragment>
                                            <button onClick={() => this.CreateNewPostCheck()}>Cancel</button>
                                            <CreatePost pages={pages} />
                                        </Fragment>
                                }

                            </Fragment>

                            : <Fragment>
                                <h1>Admin page</h1>

                                <h4>Pages</h4>
                                <button><Link to="/admin/pages">Go to pages administration</Link></button>

                                <h4>Posts</h4>
                                <button><Link to="/admin/posts">Go to posts administration</Link></button>

                                <h4>Users</h4>
                                <button><Link to="/admin/users">Go to users administration</Link></button>
                            </Fragment>
                }
            </Fragment>
        );
    }
};

export default AdminPage;