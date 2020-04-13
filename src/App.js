import React, { Component } from 'react';
import './App.css';
import './components/Login'
import './components/NewUser'
import Login from './components/Login';
import NewUser from './components/NewUser';
import Profile from './components/Profile'
import LinkButton from './components/LinkButton'
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
    this.setState({curUser: undefined})
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
        <LinkButton onClick={this.onLogoutClick} to='/'>Logout</LinkButton>
        </div>
        {this.state.curUser ? null : <Route exact path="/" render={(props) => <Login {...props} sendToken={this.addToken} />}/>}
        {this.state.curUser ? null : <Route exact path="/signup" render={(props) => <NewUser {...props} sendToken={this.addToken} />}/>}
        {this.state.curUser ? <Profile user={this.state.curUser} /> : null}
      </div>
      </Router>
    );

  }
}

export default App;
