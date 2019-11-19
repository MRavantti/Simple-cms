import React, { Component, Fragment } from 'react';

import Navbar from '../Components/Navbar';
import PostViewBox from '../Components/PostViewBox';
import Footer from '../Components/Footer';
import Hero from '../Components/Hero';

class Page extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pages: [],
        }
    }

    componentDidMount() {
        this.getPosts();
        this.getPage();
    }

    getPosts = () => {
        const api = 'http://localhost:5000/api/post/';

        fetch(api)
            .then(res => res.json())
            .then(item => { this.setState({ posts: item }); });
    }

    getPage = () => {
        const api = 'http://localhost:5000/api/page/';

        fetch(api)
            .then(res => res.json())
            .then(item => { this.setState({ pages: item }); });
    }

    render() {
        const { posts, pages } = this.state;
        const { page } = this.props.match.params;

        return (
            <Fragment>
                <Navbar />
                <div className="page-container">
                    <Hero pageName={page} pages={pages}
                    />
                    {}
                    <PostViewBox posts={posts} pageName={page} />
                </div>
                <Footer />
            </Fragment>
        )
    }
};

export default Page;