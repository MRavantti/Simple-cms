import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Switch } from 'react-router';

import './style.css';

import HomePage from '../../Pages/HomePage';
import AdminPage from '../../Pages/AdminPage';
import AboutPage from '../../Pages/AboutPage';

class App extends Component {
  state = {
    pages: [],
  }
  
  componentDidMount() {
    this.fetchApi();
  }

  fetchApi = () => {
    const api = 'http://localhost:5000/api/page/';

    fetch(api)
      .then(res => res.json())
      .then(item => {

        this.setState({
          pages: item
        })
      })
  }
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={HomePage}/>
          <Route path="/about" component={AboutPage} />
          <Route path="/admin/" exact component={AdminPage}/>
          <Route path="/admin/:admin" exact component={AdminPage} />
          <Route path="/admin/:admin/:admin" exact component={AdminPage} />
        </Switch>
      </Router>
    );
  }
}

export default App;
