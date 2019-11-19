import React, { Component, Fragment } from 'react';

import './style.css';

class PostViewBox extends Component {

    render() {
        const { pageName, posts } = this.props

        return (
            <div className="post-view-box-container">
                {
                    pageName === undefined
                        ? <Fragment>
                            <h1>Home</h1>
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
                                        </div>
                                    )
                            }
                        </Fragment>

                        : <Fragment>
                            <h1>{pageName}</h1>
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