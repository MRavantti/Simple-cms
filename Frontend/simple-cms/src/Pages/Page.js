import React, { Component, Fragment } from 'react';

import Navbar from '../Components/Navbar';
import PostViewBox from '../Components/PostViewBox';

class HomePage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pages: [],
        }
    }

    componentDidMount() {
        this.getPosts();
    }

    getPosts = () => {
        const api = 'http://localhost:5000/api/post/';

        fetch(api)
            .then(res => res.json())
            .then(item => { this.setState({ posts: item }); });
    }

    render() {
        const { posts } = this.state;
        const { page } = this.props.match.params
        
        return (
            <Fragment>
                <Navbar />
                <PostViewBox posts={posts} pageName={page} />
            </Fragment>
        )
    }
};

export default HomePage;