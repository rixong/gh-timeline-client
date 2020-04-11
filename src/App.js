import React, {Component} from 'react';
import './App.css';
import './components/Login'
import './components/NewUser'
import Login from './components/Login';
import NewUser from './components/NewUser';

class App extends Component {

  render() {

    return (
      <div className="App">
        <header className="App-header">
          GitHub Timeline App
        </header>
        <NewUser />
        <Login />
      </div>
    );

  }
}

export default App;
