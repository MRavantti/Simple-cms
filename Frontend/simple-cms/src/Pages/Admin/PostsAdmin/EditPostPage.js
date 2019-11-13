import React, { Component, Fragment } from 'react';


import '../../style.css'
import AdminNavbar from '../../../Components/AdminNavbar';
import EditPost from '../../../Components/EditPost';
import BackButton from '../../../Components/BackButton'

class EditPostPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pages: [],
            post: [],
            postId: "",
            pageName: "",
        }
    }

    componentDidMount() {
        const { id } = this.props.match.params;
        this.setState({ postId: id, })

        this.getPostByKey();
        this.fetchPages();
    }

    fetchPages = () => {
        const api = 'http://localhost:5000/api/page/';

        fetch(api)
            .then(res => res.json())
            .then(item => { this.setState({ pages: item }); });
    }

    deletePost = (id) => {
        if (window.confirm("Are you sure?")) {

            const api = `http://localhost:5000/api/post/${id}`;

            const options = {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            }

            fetch(api, options)
                .then(() => { window.location.reload(); })
        }
    }

    getPostByKey = () => {
        const api = `http://localhost:5000/api/post/${this.props.match.params.id}`;

        fetch(api)
            .then(res => res.json())
            .then(item => { this.setState({ post: item }); })
    }

    render() {
        const { post, pages } = this.state

        return (
            <Fragment>
                <AdminNavbar />
                <BackButton onClick={() => this.props.history.goBack()}/>
                <EditPost pages={pages} post={post} id={this.props.match.params.id} />
                <div>
                <button onClick={() => this.deletePost(post.post_id)}>Delete post</button>
                </div>
            </Fragment>
        );
    }
}

export default EditPostPage;