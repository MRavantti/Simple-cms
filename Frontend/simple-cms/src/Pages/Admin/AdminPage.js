import React, { Component, Fragment } from 'react';

import '../style.css'
import { Link } from 'react-router-dom';

import AdminNavbar from '../../Components/AdminNavbar'
import CreatePost from '../../Components/CreatePost';
import PagesList from '../../Components/PagesList'
class AdminPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pages: [],
            posts: [],
            users: [],
            createNewPost: false,
            pageName: "",
            post_category: "",
            title: "",
            body_text: "",
            post_image_thumbnail: "",
        }
    }

    componentDidMount() {
        this.getPages();
        this.getPosts();
        this.getUsers();
    }

    getPages = () => {
        const api = 'http://localhost:5000/api/page/';

        fetch(api)
            .then(res => res.json())
            .then(item => { this.setState({ pages: item }); });
    }

    getUsers = () => {
        const api = 'http://localhost:5000/api/user/';

        fetch(api)
            .then(res => res.json())
            .then(item => { this.setState({ users: item }); });
    }

    getPosts = () => {
        const api = 'http://localhost:5000/api/post/';

        fetch(api)
            .then(res => res.json())
            .then(item => { this.setState({ posts: item }); });
    }

    CreateNewPostCheck = () => { this.setState(prevState => ({ createNewPost: !prevState.createNewPost, })) }

    render() {

        const { params } = this.props.match;
        const { pages, posts, users, createNewPost } = this.state


        return (
            <Fragment>
                <AdminNavbar />
                {
                    params.admin === "pages"
                        ? <Fragment>
                            <PagesList pages={pages} posts={posts}/>
                            
                        </Fragment>

                        : params.admin === "posts"
                            ? <Fragment>
                                <h1>{params.admin}</h1>
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
                                                                                    post.body_text.split('\n').map((bodyText, i) =>
                                                                                        <p key={i}>{bodyText}</p>
                                                                                    )
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
                            : params.admin === "users"
                                ? <Fragment>
                                    <h1>{params.admin}</h1>
                                    <button><Link to={`/admin/users/add-user/`}>Create new user</Link></button>
                                    {
                                        users.map((user, key) =>
                                            <div key={key}>
                                                <h2>{user.username}</h2>
                                                <p>{user.first_name}</p>
                                                <p>{user.last_name}</p>
                                                <p>{user.email}</p>
                                                <p>{user.user_image_thumbnail}</p>
                                                <button><Link to={`/admin/users/edit-user/${user.id}`}>Edit user</Link></button>
                                            </div>
                                        )
                                    }

                                </Fragment>
                                : <Fragment>
                                    <h1>Admin page</h1>

                                    <h4>Pages</h4>
                                    <p>Administration of pages, to add, edit and delete pages</p>
                                    <button><Link to="/admin/pages">Go to pages administration</Link></button>

                                    <h4>Posts</h4>
                                    <p>Administration of posts, to add, edit and delete pages</p>
                                    <button><Link to="/admin/posts">Go to posts administration</Link></button>

                                    <h4>Users</h4>
                                    <p>Administration of users, to add, edit and delete users</p>
                                    <button><Link to="/admin/users">Go to users administration</Link></button>
                                </Fragment>
                }
            </Fragment>
        );
    }
};

export default AdminPage;