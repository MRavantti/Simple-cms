import React, { Component, Fragment } from 'react';


import '../../style.css'
import AdminNavbar from '../../../Components/AdminNavbar';
import EditPost from '../../../Components/EditPost';

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
        this.getPostByKey();
        this.fetchPages();
        this.setState({
            postId: id,
        })
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

    deletePost = (id) => {
        if (window.confirm("Are you sure?")) {

            const api = `http://localhost:5000/api/post/${id}`;

            fetch(api, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            })
                .then(() => {
                    window.location.reload();
                })
        }
    }

    getPostByKey = () => {
        const api = `http://localhost:5000/api/post/${this.props.match.params.id}`;

        fetch(api)
            .then(res => res.json())
            .then(item => {
                this.setState({
                    post: item
                });
            })
    }

    render() {
        const { post, pages } = this.state


        return (
            <Fragment>
                <AdminNavbar />
                    <button onClick={() => this.deletePost(post.post_id)}>Delete post</button>
                <EditPost pages={pages} post={post} id={this.props.match.params.id}/>
            </Fragment>
        );
    }
}

export default EditPostPage;