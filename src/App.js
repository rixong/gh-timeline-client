import React, { Component } from 'react';
import './App.css';
import './components/Login'
import './components/NewUser'
import Login from './components/Login';
import NewUser from './components/NewUser';
import Profile from './components/Profile'

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
      <div className="App">
        <header className="App-header">
          GitHub Timeline App
        </header>
        <div className="nav-bar">
          <button onClick={this.onLogoutClick}>Logout</button>
        </div>
        <NewUser sendToken={this.addToken} />
        <Login sendToken={this.addToken} />
        {this.state.curUser ? <Profile user={this.state.curUser} /> : null}
      </div>
    );

  }
}

export default App;
