import React, { Component, Fragment } from 'react';

import './style.css'
import { Link } from 'react-router-dom';
import AdminNavbar from '../Components/AdminNavbar';

class EditpPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            page: [],
            pageId: ""
        }
    }

    componentDidMount() {
        const { id } = this.props.match.params;
        this.getPageByKey();
        this.setState({
            pageId: id,
        })
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

        return (
            <Fragment>
                <AdminNavbar />
                <h1></h1>
                {
                    page.map((page, key) =>
                        <div className="page" key={key}>
                            <h4>{page.page_name} </h4>
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
                            <div className="page-action-list">
                                <button><Link to={`/admin/pages/edit-page/${page.page_id}`}>Edit page</Link></button>
                            </div>
                        </div>
                    )
                }
            </Fragment>
        );
    }
}

export default EditpPage;