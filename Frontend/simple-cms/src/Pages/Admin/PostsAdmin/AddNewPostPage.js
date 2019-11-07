import React, { Component, Fragment } from 'react';

import '../../style.css'
import AdminNavbar from '../../../Components/AdminNavbar';

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
        this.fetchPages();
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
    }

    changeHandler = e => {
        this.setState({ [e.target.name]: e.target.value })
        console.log(e.target.value);
        
    }

    handleSubmit = e => {
        e.preventDefault();
        this.addPost();
    }

    render() {
        const { pages, postTitle, preamble, bodyText, postImageThumbnail } = this.state;
        return (
            <Fragment>
                <AdminNavbar />
                <h1>Add new post</h1>

                <form className="add-new-page-forms" onSubmit={this.handleSubmit}>
                    <h4>Create a new post</h4>
                    <label>
                        Select page:
                                <select name="pageName" onChange={this.changeHandler}>
                            <option value="">--- Select an option ---</option>
                            <option value="Home">Home</option>
                            {
                                pages.map((page, key) => {
                                    return <option key={key} value={page.page_name} >{page.page_name}</option>
                                })
                            }
                        </select>
                    </label>
                    <label>
                        Title:
                        <input
                            type="text"
                            name="postTitle"
                            value={postTitle}
                            onChange={this.changeHandler}
                        />
                    </label>
                    <label>
                        preamble:
                        <input
                            type="text"
                            name="preamble"
                            value={preamble}
                            onChange={this.changeHandler}
                        />
                    </label>
                    <label>
                        Body text:
                        <textarea
                            type="text"
                            name="bodyText"
                            value={bodyText}
                            onChange={this.changeHandler}
                        />
                    </label>
                    <label>
                        image:
                        <input
                            type="text"
                            name="postImageThumbnail"
                            value={postImageThumbnail}
                            onChange={this.changeHandler}
                        />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </Fragment>
        );
    }
}

export default AddNewPostPage;