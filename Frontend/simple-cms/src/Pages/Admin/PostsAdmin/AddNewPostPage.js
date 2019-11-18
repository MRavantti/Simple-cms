import React, { Component, Fragment } from 'react';

import '../../style.css'
import AdminNavbar from '../../../Components/AdminNavbar';
import CreatePost from '../../../Components/CreatePost';

class AddNewPostPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pages: [],
            postCategory: "",
            postTitle: "",
            preamble: "",
            bodyText: "",
            postImageThumbnail: "",
        }
    }

    componentDidMount() {
        this.getPages();
    }

    getPages = () => {
        const api = 'http://localhost:5000/api/page/';

        fetch(api)
            .then(res => res.json())
            .then(item => { this.setState({ pages: item }); });
    }

    addPost = () => {
        const api = `http://localhost:5000/api/post`


        fetch(api, {
            method: 'Post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Post_category: this.state.pageName,
                Title: this.state.postTitle,
                Preamble: this.state.preamble,
                Body_text: this.state.bodyText,
                Post_image_thumbnail: this.state.postImageThumbnail
            })
        })
            .then(res => {
                this.props.history.push(`/admin/posts/`);
                window.location.reload();
            })
    }

    changeHandler = e => { this.setState({ [e.target.name]: e.target.value }) }

    fileSelectedHandler = e => { this.setState({ [e.target.name]: e.target.files[0].name }) }

    handleSubmit = e => {
        e.preventDefault();
        this.addPost();
    }

    render() {
        const { pages } = this.state;

        return (
            <Fragment>
                <AdminNavbar />
                <CreatePost pages={pages} />
            </Fragment>
        );
    }
}

export default AddNewPostPage;