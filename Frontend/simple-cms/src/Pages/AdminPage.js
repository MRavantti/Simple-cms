import React, { Component, Fragment } from 'react';

import './style.css'
import AdminNavbar from '../Components/AdminNavbar';
import { Link } from 'react-router-dom';

class AdminPage extends Component {
    state = {
        pages: [],
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
        console.log(params.admin);
        console.log(this.state.pages);
        return (
            <Fragment>
                <AdminNavbar />
                {
                    params.admin === "pages"
                        ? <Fragment>
                            <h1>{params.admin}</h1>
                            <Link to="pages/add-page">Add new page</Link>
                            {
                                this.state.pages.map((page, key) =>
                                    <div className="page" key={key}>
                                        <h4>{page.page_name} </h4>
                                        {
                                            page.posts.map((post, postKey) =>
                                                <div key={postKey}>
                                                    <h5>{post.title}</h5>
                                                    <p>{post.post_image_thumbnail}</p>
                                                    <p>{post.preamble}</p>
                                                    <p>{post.body_text}</p>
                                                </div>
                                            )
                                        }
                                        <div className="page-action-list">
                                            <Link to={`pages/edit-page/:${page.page_id}`}>Edit page</Link>
                                            <p onClick={() => this.deletePage(page.page_id)}>Delete page</p>
                                        </div>
                                    </div>
                                )
                            }
                        </Fragment>
                        : params.admin === "add-page"
                            ? <Fragment>
                                <h1>Add new page</h1>
                            </Fragment>
                            : params.admin === "edit-page"
                                ? <Fragment> <h1>Edit page</h1> </Fragment>
                                : params.admin === "delete-page"
                                    ? <Fragment> <h1>Delete page</h1> </Fragment>
                                    : <h1>LOL</h1>
                }
            </Fragment>
        );
    }
};

export default AdminPage;