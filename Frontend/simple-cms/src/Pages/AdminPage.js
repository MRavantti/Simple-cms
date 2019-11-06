import React, { Component, Fragment } from 'react';

import './style.css'
import AdminNavbar from '../Components/AdminNavbar';
import { Link } from 'react-router-dom';

class AdminPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pages: [],
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

    deletePage = (id) => {
        if (window.confirm("Are you sure?")) {

            const api = `http://localhost:5000/api/page/${id}`;

            fetch(api, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            })
        }
    }

    render() {
        const { params } = this.props.match;
        const { pages } = this.state
        console.log(params);


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
                                            <button onClick={() => this.deletePage(page.page_id)}>Delete page</button>
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
                        : params.admin === "add-page"
                            ? <Fragment>



                            </Fragment>
                            : params.admin === "edit-page"
                                ? <Fragment> <h1>Edit page</h1> </Fragment>
                                : params.admin === this.state.pageName || this.state.pages.page_id
                                    ? <Fragment>
                                        <h1>{this.state.pageName}</h1>
                                    </Fragment>
                                    : <h1>LOL</h1>
                }
            </Fragment>
        );
    }
};

export default AdminPage;