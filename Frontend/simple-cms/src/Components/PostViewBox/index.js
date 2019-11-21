import React, { Component, Fragment } from 'react';

import './style.css';
import LinkButton from '../LinkButton';

class PostViewBox extends Component {

    render() {
        const { pageName, posts } = this.props


        return (
            <div className="post-view-box-container">

                {
                    pageName === undefined
                        ? <Fragment>
                            {
                                posts === undefined
                                    ? <p>No posts</p>
                                    : posts.filter(function (post) { return post.post_category === "Home" }).map((post, key) =>
                                        <div className="post-view-box" key={key} >
                                            <h2>{post.title}</h2>
                                            {
                                                post.body_text.split('\n').map((bodyText, i) => {
                                                    return <p key={i}>{bodyText}</p>
                                                })
                                            }
                                            {
                                                post.link_to === "noLink" || post.link_to === undefined || post.link_to === ""
                                                ? null
                                                : <div className="link-to-button-container">
                                                        <LinkButton text="read more" link={`/${post.link_to}`} backgroundColor="#262832" />
                                                    </div>
                                            }
                                            <div className="line" />
                                        </div>
                                    )
                            }
                        </Fragment>

                        : <Fragment>
                            {
                                posts === undefined

                                    ? <p>No page</p>
                                    : posts.filter(function (post) { return post.post_category === pageName }).map((post, key) =>
                                        <div className="post-view-box" key={key} >
                                            <h2>{post.title}</h2>
                                            {
                                                post.body_text.split('\n').map((bodyText, i) => {
                                                    return <p key={i}>{bodyText}</p>
                                                })
                                            }
                                            {
                                                post.link_to === "noLink" || post.link_to === undefined || post.link_to === ""
                                                    ? null
                                                    : <div className="link-to-button-container">
                                                        <LinkButton text="read more" link={`/${post.link_to}`} backgroundColor="#262832" />
                                                    </div>
                                            }
                                            <div className="line" />
                                        </div>
                                    )
                            }
                        </Fragment>
                }
            </div>
        )
    }
}

export default PostViewBox;