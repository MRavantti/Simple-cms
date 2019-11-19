import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Switch } from 'react-router';

import './style.css';

import Page from '../../Pages/Page';

import AdminPage from '../../Pages/Admin/AdminPage';
import AddNewPagePage from '../../Pages/Admin/PagesAdmin/AddNewPagePage';
import EditPagePage from '../../Pages/Admin/PagesAdmin/EditPagePage';
import AddNewPostPage from '../../Pages/Admin/PostsAdmin/AddNewPostPage';
import EditPostPage from '../../Pages/Admin/PostsAdmin/EditPostPage';
import AddNewUserPage from '../../Pages/Admin/UsersAdmin/AddNewUserPage';
import EditUserPage from '../../Pages/Admin/UsersAdmin/EditUserPage';
import CompanyInformationPage from '../../Pages/Admin/CompanyInformation/CompanyInformationPage';
import Footer from '../Footer';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={Page} />
          <Route path="/:page" exact component={Page} />
          <Route path="/admin/start" exact component={AdminPage} />
          <Route path="/admin/:admin" exact component={AdminPage} />
          <Route path="/admin/pages/add-page" exact component={AddNewPagePage} />
          <Route path="/admin/pages/edit-page/:id" exact component={EditPagePage} />
          <Route path="/admin/posts/add-post/" exact component={AddNewPostPage} />
          <Route path="/admin/posts/add-post/:name" exact component={AddNewPostPage} />
          <Route path="/admin/posts/edit-post/:id" exact component={EditPostPage} />
          <Route path="/admin/users/add-user/" exact component={AddNewUserPage} />
          <Route path="/admin/users/edit-user/:id" exact component={EditUserPage} />
          <Route path="/admin/info/company-information" exact component={CompanyInformationPage} />
        </Switch>
        <Footer />
      </Router>
    );
  }
}

export default App;
