import React, { Component, Fragment } from 'react';

import './style.css'
import { Link } from 'react-router-dom';

class PagesList extends Component {
    render() {

        const { pages, posts } = this.props;
        return (
            <Fragment>
                <div className="pages-list">
                    <h1>Pages</h1>

                    <h3>Home</h3>
                    <button className="edit-button"><Link to={`/admin/pages/edit-page/Home`}>Edit page</Link></button>
                    {
                        posts.filter(function (post) { return post.post_category === "Home" }).map((post, key) =>
                            <div className={`page-list-item ${key}`} key={key}>
                                <div className="page-list-item-top">
                                    <h5>{post.title}</h5>
                                    <button className="edit-button"><Link to={`/admin/posts/edit-post/${post.post_id}`}>Edit post</Link></button>
                                </div>

                                <div className="page-list-content">
                                    {
                                        post.body_text.split('\n').map((bodyText, i) =>
                                            <p key={i}>{bodyText}</p>
                                        )
                                    }
                                    <p>{post.post_image_thumbnail}</p>
                                    <div className="post-created-at">
                                        <p>Created at: </p>
                                        {post.created_date_time.split('T').map((dateTime, i) => <p className="date-time" key={i}>{dateTime}</p>)}
                                    </div>
                                    <div className="post-updated-at">
                                        <p>Updated at: </p>
                                        {
                                            parseInt(post.updated_at_date_time) < 2019
                                                ? <p>Not Updated</p>
                                                : <Fragment>
                                                    {post.updated_at_date_time.split('T').map((dateTime, i) => <p className="date-time" key={i}>{dateTime}</p>)}
                                                </Fragment>
                                        }
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
                <div className="pages-list">
                    {
                        pages.length === 0
                            ? <h3>You do not have any pages yet</h3>
                            : <Fragment>
                                {
                                    pages.map((page, key) =>
                                        <div key={key}>
                                            <h4>{page.page_name} </h4>
                                            <button className="edit-button"><Link to={`/admin/pages/edit-page/${page.page_id}`}>Edit page</Link></button>
                                            <div key={key}>
                                                {
                                                    page.posts.map((post, postKey) =>
                                                        post === null
                                                            ? <div key={postKey}> <p>You do not have any posts for this page yet</p></div>
                                                            : <div className={`page-list-item ${postKey}`} key={postKey}>
                                                                <div className="page-list-item-top">
                                                                    <h5>{post.title}</h5>
                                                                    <button className="edit-button"><Link to={`/admin/posts/edit-post/${post.post_id}`}>Edit post</Link></button>
                                                                </div>
                                                                <div className="page-list-content">
                                                                    <p>{post.post_image_thumbnail}</p>
                                                                    {
                                                                        post.body_text.split('\n').map((bodyText, i) =>
                                                                            <p key={i}>{bodyText}</p>
                                                                        )
                                                                    }
                                                                    <div className="post-created-at">
                                                                        <p>Created at: </p>
                                                                        {post.created_date_time.split('T').map((dateTime, i) => <p className="date-time" key={i}>{dateTime}</p>)}
                                                                    </div>
                                                                    <div className="post-updated-at">
                                                                        <p>Updated at: </p>
                                                                        {
                                                                            parseInt(post.updated_at_date_time) < 2019
                                                                                ? <p>Not Updated</p>
                                                                                : <Fragment>
                                                                                    {post.updated_at_date_time.split('T').map((dateTime, i) => <p className="date-time" key={i}>{dateTime}</p>)}
                                                                                </Fragment>
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </div>
                                                    )
                                                }
                                            </div>
                                        </div>
                                    )
                                }
                            </Fragment>
                    }
                </div>
            </Fragment>
        )
    }
}

export default PagesList;