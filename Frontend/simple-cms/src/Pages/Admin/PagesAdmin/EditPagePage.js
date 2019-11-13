import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

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
        const { page, changePageName, pageName, CreateNewPost, homePagePosts } = this.state
        const { params } = this.props.match;

        return (
            <Fragment>
                <AdminNavbar />
                {
                    params.id === "Home"
                        ? <Fragment>
                            <BackButton onClick={() => this.props.history.goBack()} />

                            <h1>Home</h1>
                            <h4>Posts for this page:</h4>

                            {
                                CreateNewPost === false
                                    ? <Fragment>
                                        <Button onClick={() => this.createNewPostCheck()} text="Create new post" backgroundColor="#262933" />
                                        {
                                            homePagePosts.filter(function (post) { return post.post_category === "Home" }).map((post, key) =>
                                                <div key={key}>
                                                    <h4>{post.post_category}</h4>
                                                    <h5>{post.title}</h5>
                                                    <p>{post.body_text}</p>
                                                    <p>{post.post_image_thumbnail}</p>
                                                    <Button onClick={() => this.delete("post", post.post_id)} text="Delete post" backgroundColor="#D72323" />
                                                </div>
                                            )
                                        }
                                    </Fragment>
                                    : <Fragment>
                                        <Button onClick={() => this.createNewPostCheck()} text="Cancel" backgroundColor="#262933" />
                                        <CreatePost pageName={"Home"} />
                                    </Fragment>
                            }

                        </Fragment>

                        : <Fragment>
                            <BackButton onClick={() => this.props.history.goBack()} />
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
                                                    <Button onClick={() => this.changePageNameCheck()} text="Cancel" backgroundColor="#262933" />
                                                </Fragment>

                                                : <Fragment>
                                                    <h1>{page.page_name}</h1>
                                                    <Button onClick={() => this.changePageNameCheck()} text="Change name of this page" backgroundColor="#262933" />

                                                </Fragment>
                                        }
                                        <h4>Posts for this page:</h4>
                                        {
                                            CreateNewPost === false
                                                ? <Fragment>
                                                    <Button onClick={() => this.createNewPostCheck()} text="Add new post" backgroundColor="#008000" />
                                                    {
                                                        page.posts.map((post, postKey) =>
                                                            post === null

                                                                ? <p>You do not have any posts for this page</p>

                                                                : <div key={postKey}>
                                                                    <h5>{post.title}</h5>
                                                                    <p>{post.post_image_thumbnail}</p>
                                                                    <p>{post.body_text}</p>
                                                                    <div className="page-action-list">
                                                                        <LinkButton link={`/admin/posts/edit-post/${post.post_id}`} text="Edit post" />
                                                                        <Button onClick={() => this.delete("post", post.post_id)} text="Delete post" backgroundColor="#D72323" />

                                                                    </div>
                                                                </div>
                                                        )
                                                    }
                                                </Fragment>

                                                : <Fragment>
                                                    <Button onClick={() => this.createNewPostCheck()} text="Cancel" backgroundColor="#262933" />
                                                    <CreatePost pageName={page.page_name} />
                                                </Fragment>
                                        }
                                        <Button onClick={() => this.delete("page", page.page_id)} text="Delete page" backgroundColor="#D72323" />
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