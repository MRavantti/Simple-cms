import React, { Component, Fragment } from 'react';

import '../style.css'

import AdminNavbar from '../../Components/AdminNavbar'
import CreatePost from '../../Components/CreatePost';
import PagesList from '../../Components/PagesList';
import LinkButton from '../../Components/LinkButton'
import Button from '../../Components/Button'
import BackButton from '../../Components/BackButton'


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

    CreateNewPostCheck = () => {
        this.setState(prevState => ({
            createNewPost: !prevState.createNewPost,
        }))
    }

    render() {

        const { params } = this.props.match;
        const { pages, posts, users, createNewPost } = this.state


        return (
            <Fragment>
                <AdminNavbar />
                {
                    params.admin === "pages"
                        ? <div className="pages">
                            <PagesList pages={pages} posts={posts} />

                        </div>

                        : params.admin === "posts"
                            ? <div className="posts">
                                <h1>{params.admin}</h1>
                                {
                                    createNewPost === false

                                        ? <Fragment>
                                            <div className="post-top">
                                                <Button onClick={() => this.CreateNewPostCheck()} text="Add new post" backgroundColor="#008000" />
                                            </div>
                                            {
                                                posts.length === 0
                                                    ? <h3>You do not have any posts yet</h3>
                                                    : <Fragment>
                                                        {
                                                            posts.map((post, key) =>
                                                                <div className="post-container" key={key}>
                                                                    {
                                                                        post === null
                                                                            ? <p>You do not have any posts yet</p>
                                                                            : <Fragment>
                                                                                <h5>Page: {post.post_category}</h5>

                                                                                <div className="line" />

                                                                                <h3>{post.title}</h3>

                                                                                <div className="line" />

                                                                                <div className="body-text">
                                                                                    {

                                                                                        post.body_text.split('\n').map((bodyText, i) =>
                                                                                            <p key={i}>{bodyText}</p>
                                                                                        )
                                                                                    }
                                                                                </div>

                                                                                <div className="line" />

                                                                                <p>{post.link_to !== "" ? `This post links to : ${post.link_to}` : "this post does not link to another page"}</p>


                                                                                <div className="line" />

                                                                            </Fragment>
                                                                    }
                                                                    <div className="action-buttons">
                                                                        <LinkButton text="Edit post" link={`/admin/posts/edit-post/${post.post_id}`} backgroundColor="#262832" />
                                                                        <Button onClick={() => this.delete("post", post.post_id)} text="Delete post" backgroundColor="#D72323" />

                                                                    </div>
                                                                </div>
                                                            )
                                                        }
                                                    </Fragment>
                                            }
                                        </Fragment>

                                        : <Fragment>
                                            <BackButton onClick={() => this.CreateNewPostCheck()} />
                                            <CreatePost pages={pages} />
                                        </Fragment>
                                }

                            </div>
                            : params.admin === "users"
                                ? <div className="users">
                                    <h1>{params.admin}</h1>
                                    <LinkButton text="Create new user" link={`/admin/users/add-user/`} backgroundColor="#008000" />
                                    {
                                        users.length < 1

                                            ? <p>There are no users</p>

                                            : users.map((user, key) =>
                                                <div className="user-content" key={key}>
                                                    <h2>{user.username}</h2>

                                                    <div className="line" />

                                                    <p>Name: {user.first_name === null && user.last_name === null ? `Name is not known` : `${user.first_name} ${user.last_name}`}</p>

                                                    <div className="line" />

                                                    <p>Email: {user.email}</p>
                                                    <LinkButton text="Edit user" link={`/admin/users/edit-user/${user.id}`} backgroundColor="#262832" />
                                                </div>
                                            )
                                    }

                                </div>
                                : <Fragment>
                                    <div className="pages">
                                        <h1>Admin page</h1>

                                        <div className="admin-start-page-item">
                                            <h4>Pages</h4>
                                            <p>Administration of pages, to add, edit and delete pages</p>
                                            <LinkButton text="Go to pages administration" link={`/admin/pages`} backgroundColor="#262832" />
                                        </div>

                                        <div className="border-line" />
                                        
                                        <div className="admin-start-page-item">
                                            <h4>Posts</h4>
                                            <p>Administration of posts, to add, edit and delete pages</p>
                                            <LinkButton text="Go to posts administration" link={`/admin/posts`} backgroundColor="#262832" />
                                        </div>

                                        <div className="border-line" />

                                        <div className="admin-start-page-item">
                                            <h4>Users</h4>
                                            <p>Administration of users, to add, edit and delete users</p>
                                            <LinkButton text="Go to users administration" link={`/admin/users`} backgroundColor="#262832" />
                                        </div>

                                        <div className="border-line" />

                                        <div className="admin-start-page-item">
                                            <h4>Company information</h4>
                                            <p>Administration of company information, to add and edit</p>
                                            <LinkButton text="Go to company information administration" link={`/admin/info/company-information`} backgroundColor="#262832" />
                                        </div>

                                        <div className="border-line" />

                                    </div>
                                </Fragment>
                }
            </Fragment>
        );
    }
};

export default AdminPage;