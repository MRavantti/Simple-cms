import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

import '../../style.css'
import AdminNavbar from '../../../Components/AdminNavbar';

class EditPagePage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            page: [],
            pageId: "",
            pageName: "",
        }
    }

    componentDidMount() {
        const { id } = this.props.match.params;
        this.getPageByKey();
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
        }
    }

    getPageByKey = () => {
        const api = `http://localhost:5000/api/page/${this.props.match.params.id}`;

        fetch(api)
            .then(res => res.json())
            .then(item => {
                this.setState({
                    page: item
                });
            });
    }

    render() {
        const { page } = this.state
        console.log(page);
        
        return (
            <Fragment>
                <AdminNavbar />
                <h1>Edit Page</h1>
                {
                    page.map((page, key) =>
                    <div className="page" key={key}>
                            <h4>{page.page_name} </h4>
                    <h4>Add new post to this page</h4>
                    <button><Link to={`/admin/posts/add-post/`}>Add new post</Link></button>
                            {
                                page.posts.map((post, postKey) =>
                                    post === null
                                        ? "No Posts"
                                        : <div key={postKey}>
                                            <h5>{post.title}</h5>
                                            <p>{post.post_image_thumbnail}</p>
                                            <p>{post.preamble}</p>
                                            <p>{post.body_text}</p>
                                            <div className="page-action-list">
                                                <button><Link to={`/admin/posts/edit-post/${post.post_id}`}>Edit post</Link></button>
                                                <button onClick={() => this.deletePost(page.page_id)}>Delete post</button>

                                            </div>
                                        </div>
                                )
                            }
                        </div>
                    )
                }
            </Fragment>
        );
    }
}

export default EditPagePage;