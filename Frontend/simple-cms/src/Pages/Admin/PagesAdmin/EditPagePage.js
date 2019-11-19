import React, { Component, Fragment } from 'react';

import '../../style.css'
import AdminNavbar from '../../../Components/AdminNavbar';
import CreatePost from '../../../Components/CreatePost';
import BackButton from '../../../Components/BackButton';
import LinkButton from '../../../Components/LinkButton';
import Button from '../../../Components/Button';

class EditPagePage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            page: [],
            pages: [],
            pageId: "",
            pageName: "",
            changePageName: false,
            CreateNewPost: false,
        }
    }

    componentDidMount() {
        const { id } = this.props.match.params;
        this.getPageByKey(id);
        this.getPages(id);
        this.setState({
            pageId: id,
        })
    }

    delete = (type, id) => {
        if (window.confirm("Are you sure?")) {

            const api = `http://localhost:5000/api/${type}/${id}`;

            const options = {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            }

            fetch(api, options)
                .then(() => { this.props.history.goBack(); })
        }
    }

    updatePageName = (id) => {
        const api = `http://localhost:5000/api/page/${id}`;

        const options = {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                page_name: this.state.pageName,
                hero_text: this.state.heroText,
            })
        }

        fetch(api, options)
            .then(() => { window.location.reload(); })

    }

    getPageByKey = (id) => {
        const api = `http://localhost:5000/api/page/${id}`;

        fetch(api)
            .then(res => res.json())
            .then(item => { this.setState({ page: item }); })
    }

    getPages = () => {
        const api = `http://localhost:5000/api/page/`;

        fetch(api)
            .then(res => res.json())
            .then(item => { this.setState({ pages: item }); })
    }

    changePageNameCheck = () => {
        this.setState(prevState => ({ changePageName: !prevState.changePageName }))
    }

    changeHeroTextCheck = () => {
        this.setState(prevState => ({ changeHeroText: !prevState.changeHeroText }))
    }

    createNewPostCheck = () => {
        this.setState(prevState => ({
            CreateNewPost: !prevState.CreateNewPost,
        }))
    }

    handleSubmit = e => {
        e.preventDefault();
        this.updatePageName(this.state.pageId);
    }

    changeHandler = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    render() {
        const { page, changePageName, CreateNewPost, pages, changeHeroText } = this.state

        return (
            <Fragment>
                <AdminNavbar />
                <BackButton onClick={() => this.props.history.goBack()} />
                <Fragment>
                    {
                        page.map((page, key) =>
                            <div className="posts" key={key}>
                                <div className="page-info">
                                    {
                                        changePageName === true

                                            ? <Fragment>
                                                <form className="forms" onSubmit={this.handleSubmit}>
                                                    <label>
                                                        Enter new page name:
                                                            <input
                                                            type="text"
                                                            name="pageName"
                                                            placeholder="Enter page name..."
                                                            defaultValue={page.page_name}
                                                            onChange={this.changeHandler}
                                                        />
                                                    </label>
                                                    <input className="submit" type="submit" value="Save" />
                                                </form>
                                                <Button onClick={() => this.changePageNameCheck()} text="Cancel" backgroundColor="#262933" />
                                            </Fragment>

                                            : <Fragment>
                                                <h1>{page.page_name}</h1>
                                                <Button onClick={() => this.changePageNameCheck()} text="Change name of this page" backgroundColor="#262933" />

                                            </Fragment>
                                    }
                                    {
                                        changeHeroText === true

                                            ? <Fragment>
                                                <form className="forms" onSubmit={this.handleSubmit}>
                                                    <label>
                                                        <p className="label">Enter hero text:</p>
                                                        <textarea
                                                            type="text"
                                                            name="heroText"
                                                            placeholder="enter hero text..."
                                                            defaultValue={page.hero_text}
                                                            onChange={this.changeHandler}
                                                        />
                                                    </label>
                                                    <input className="submit" type="submit" value="Save" />
                                                </form>
                                                <Button onClick={() => this.changeHeroTextCheck()} text="Cancel" backgroundColor="#262933" />
                                            </Fragment>

                                            : <Fragment>
                                                <p>{page.hero_text === "" ? "No hero text" : page.hero_text}</p>
                                                <Button onClick={() => this.changeHeroTextCheck()} text="Change hero text" backgroundColor="#262933" />

                                            </Fragment>
                                    }
                                </div>

                                <div className="line" />
                                {
                                    CreateNewPost === false
                                        ? <Fragment>
                                            <div className="page-button-container">
                                                <Button onClick={() => this.createNewPostCheck()} text="Add new post" backgroundColor="#008000" />
                                            </div>
                                            {
                                                page.posts.map((post, postKey) =>
                                                    post === null

                                                        ? <p key={postKey}>You do not have any posts for this page</p>

                                                        : <div className="page-posts" key={postKey}>
                                                            <h2>{post.title}</h2>
                                                            <div className="line"></div>
                                                            {
                                                                post.body_text.split('\n').map((bodyText, i) => {
                                                                    return <p key={i}>{bodyText}</p>
                                                                })
                                                            }
                                                            <div className="line" />
                                                            <p>{post.link_to !== "" ? `This post links to : ${post.link_to}` : "this post does not link to another page"}</p>
                                                            <div className="action-buttons">
                                                                <LinkButton link={`/admin/posts/edit-post/${post.post_id}`} text="Edit post" backgroundColor="#262933" />
                                                                <Button onClick={() => this.delete("post", post.post_id)} text="Delete post" backgroundColor="#D72323" />
                                                            </div>
                                                        </div>
                                                )
                                            }
                                        </Fragment>

                                        : <Fragment>
                                            <div className="page-button-container">
                                                <Button onClick={() => this.createNewPostCheck()} text="Cancel" backgroundColor="#262933" />
                                            </div>
                                            <CreatePost pageName={page.page_name} pages={pages} />
                                        </Fragment>
                                }
                                <div className="action-buttons">
                                    <Button onClick={() => this.delete("page", page.page_id)} text="Delete page" backgroundColor="#D72323" />
                                </div>
                            </div>
                        )
                    }

                </Fragment>


            </Fragment>
        );
    }
}

export default EditPagePage;