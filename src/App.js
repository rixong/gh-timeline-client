import React, {Component} from 'react';
import './App.css';
import './components/Login'
import Login from './components/Login';

class App extends Component {

  render() {

    return (
      <div className="App">
        <header className="App-header">
          GitHub Timeline App
        </header>
        <Login />
      </div>
    );

  }
}

export default App;
