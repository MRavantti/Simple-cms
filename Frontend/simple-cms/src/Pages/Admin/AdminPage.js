import React, { Component, Fragment } from 'react';

import '../style.css'
import AdminNavbar from '../../Components/AdminNavbar'
import { Link } from 'react-router-dom';

class AdminPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pages: [],
            posts: [],
            pageName: "",
            post_category: "",
            title: "Hello world",
            preamble: "Welcome to your new page",
            body_text: "Create new post",
            post_image_thumbnail: "Image",
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

    render() {
        const { params } = this.props.match;
        const { pages, posts } = this.state

        return (
            <Fragment>
                <AdminNavbar />
                {
                    params.admin === "pages"
                        ? <Fragment>
                            <h1>{params.admin}</h1>
                            <button><Link to="pages/add-page">Add a new page</Link></button>
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
                                                    ? "No Posts"
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

                        : params.admin === "posts"
                            ? <Fragment>
                                {
                                    posts.map((post, key) =>
                                        <div className="page" key={key}>
                                            {
                                                post === null
                                                    ? "No Posts"
                                                    : <div key={key}>
                                                        <h5>{post.title}</h5>
                                                        <p>{post.post_image_thumbnail}</p>
                                                        <p>{post.preamble}</p>
                                                        <p>{post.body_text}</p>
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