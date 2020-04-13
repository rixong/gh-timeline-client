import React, { Component } from 'react';
import './App.css';
import './components/Login'
import './components/NewUser'
import Login from './components/Login';
import NewUser from './components/NewUser';
import Profile from './components/Profile'
import { BrowserRouter as Router, Route } from 'react-router-dom';

class App extends Component {

  constructor() {
    super()
    this.state = {
      curUser: '',
    }
  }

  componentDidMount() {
    if (localStorage.getItem('accessToken')) {
      this.setCurUser();
    }
  }

  onLogoutClick = () => {
    localStorage.removeItem('accessToken')
    this.setState({ curUser: undefined })
  }

  addToken = (token) => {
    localStorage.setItem('accessToken', token);
    this.setCurUser();
  }

  setCurUser = () => {
    fetch('http://localhost:3000/api/v1/profile', {
      method: 'GET',
      headers: {
        Authorization: `Bearer: ${localStorage.getItem('accessToken')}`
      }
    })
      .then(res => res.json())
      .then(json => this.setState({ curUser: json.user }))
  }

  render() {

    return (
      <Router>
        <div className="App">
          <header className="App-header">
            GitHub Timeline App
        </header>
          <div className="nav-bar">
            <button onClick={this.onLogoutClick}>Logout</button>
          </div>
          <Route exact path="/" render={(props) => <Login {...props} sendToken={this.addToken} />} />
          <Route exact path="/signup" component={NewUser} sendToken={this.addToken} />
          {this.state.curUser ? <Route exact path="/profile" render={(props) => <Profile {...props} user={this.state.curUser} />} /> : null}
        </div>
      </Router>
    );

  }
}

export default App;
