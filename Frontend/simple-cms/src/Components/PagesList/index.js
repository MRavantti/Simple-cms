import React, { Component, Fragment } from 'react';

import './style.css'
import LinkButton from '../LinkButton'

class PagesList extends Component {
    render() {

        const { pages } = this.props;
        return (
            <div className="page-list-component">
                <div className="pages-list-top">
                    <h1>Pages</h1>
                    <LinkButton link={`/admin/pages/add-page`} text="Add new page" backgroundColor="#008000" />
                </div>
                {
                    pages.length === 0
                        ? <h3>You do not have any pages yet</h3>
                        : <Fragment>
                            {
                                pages.map((page, key) =>
                                    <div className="pages-list" key={key}>
                                        <div key={key}>
                                            <div className="page-top-container">
                                                <div className="page-top-item">
                                                    <h3 className="page-name">{page.page_name} </h3>

                                                    <div className="line" />

                                                    <p>{page.hero_text}</p>
                                                </div>
                                                <LinkButton text="Edit page" link={`/admin/pages/edit-page/${page.page_id}`} backgroundColor="#262832" />
                                            </div>
                                            <div className="line" />
                                            <div key={key}>
                                                {
                                                    page.posts.map((post, postKey) =>
                                                        post === null
                                                            ? <div key={postKey}> <p>You do not have any posts for this page yet</p></div>
                                                            : <div className={`page-list-item-container ${postKey}`} key={postKey}>
                                                                <div className="page-list-item">
                                                                    <h5>{post.title}</h5>
                                                                    <LinkButton text="Edit post" link={`/admin/posts/edit-post/${post.post_id}`} backgroundColor="#262832" />
                                                                </div>
                                                            </div>
                                                    )
                                                }
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        </Fragment>
                }
            </div>
        )
    }
}

export default PagesList;