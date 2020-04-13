import React, { Component } from 'react';

class Login extends Component {

  constructor() {
    super()
    this.state = {
      email: '',
      password: ''
    }
  }

  handleChange = e => {
    this.setState({
        [e.target.name]: e.target.value
    })
}

handleLoginSubmit = (e) => {
  e.preventDefault();
  console.log('login here');
  
  fetch('http://localhost:3000/api/v1/login',{
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({
      user: {
        email: this.state.email,
        password: this.state.password,
      }
  })
})
.then(res => res.json())
// .then(json => console.log(json))
.then(json => this.props.sendToken(json.jwt))
}

  render() {
    return <div>

      <h2>Existing User</h2>
      <form onSubmit={this.handleLoginSubmit}>
        <label htmlFor='email'>Email</label>
        <input
          type="text"
          name="email"
          onChange={event => this.handleChange(event)}
          value={this.state.email}
          />

        <label htmlFor='password'>Password</label>
        <input
          type="text"
          name="password"
          onChange={event => this.handleChange(event)}
          value={this.state.password}
          />

        <button type="submit">Login</button>
      </form>
<br></br>
      <button onClick={this.handleClick}>Click to see profile info</button>
    </div>
  }
}
export default Login;