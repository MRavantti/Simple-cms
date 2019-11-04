import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import './style.css';
import Navbar from '../Navbar';

class App extends Component {
  state = {
    posts: [],
  }

  componentDidMount() {
    this.fetchApi();
  }

  fetchApi = () => {
    const api = 'http://localhost:5000/api/post/';

    fetch(api)
      .then(res => res.json())
      .then(item => {

        this.setState({
          posts: item
        })
      })
  }
  render() {
    return (
      <Router>
        <Navbar />
      </Router>
    );
  }
}

export default App;
