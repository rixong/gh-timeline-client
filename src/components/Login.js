import React, { Component } from 'react';

class Login extends Component {

  constructor() {
    super()
    this.state = {
      username: '',
      password: '',
      token: ''
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
        username: this.state.username,
        password: this.state.password,
      }
  })
})
.then(res => res.json())
// .then(json => console.log(json))
.then(json => this.setState({token: json.jwt}))
}

handleClick = () => {
  fetch('http://localhost:3000/api/v1/profile', {
  method: 'GET',
  headers: {
    Authorization: `Bearer: ${this.state.token}`
  }
})
.then(res => res.json())
.then(json => console.log(json))

}

  render() {
    return <div>

      <h2>Existing User</h2>
      <form onSubmit={this.handleLoginSubmit}>
        <label htmlFor='username'>Username</label>
        <input
          type="text"
          name="username"
          onChange={event => this.handleChange(event)}
          value={this.state.username}
          />

        <label htmlFor='password'>Password</label>
        <input
          type="text"
          name="password"
          onChange={event => this.handleChange(event)}
          value={this.state.password}
          />

        <button type="submit">Submit</button>
      </form>
<br></br>
      <button onClick={this.handleClick}>Click to see profile info</button>
    </div>
  }
}
export default Login;