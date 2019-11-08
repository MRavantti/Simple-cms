import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

import '../../style.css'
import AdminNavbar from '../../../Components/AdminNavbar';
import CreatePost from '../../../Components/CreatePost';

class EditPagePage extends Component {
    constructor(props) {
        super(props)
        this.state = {
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
        const { page, changePageName, pageName, CreateNewPost } = this.state

        return (
            <Fragment>
                <AdminNavbar />
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
                                            <button onClick={() => this.changePageNameCheck()}>Cancel</button>
                                        </form>
                                    </Fragment>

                                    : <Fragment>
                                        <h1>{page.page_name}</h1>
                                        <button onClick={() => this.changePageNameCheck()}>Change name of this page</button>
                                    </Fragment>
                            }
                            <h4>Posts for this page:</h4>
                            <button onClick={() => this.CreateNewPostCheck()}>Add new post</button>
                            {
                                CreateNewPost === false
                                    ? <Fragment>
                                        {
                                            page.posts.map((post, postKey) =>
                                                post === null

                                                    ? "You do not have any posts for this page"

                                                    : <div key={postKey}>
                                                        <h5>{post.title}</h5>
                                                        <p>{post.post_image_thumbnail}</p>
                                                        <p>{post.preamble}</p>
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
                                        <CreatePost pageName={page.page_name}/>
                                        <button onClick={() => this.CreateNewPostCheck()}>Cancel</button>
                                    </Fragment>
                            }
                        </div>
                    )
                }
            </Fragment>
        );
    }
}

export default EditPagePage;