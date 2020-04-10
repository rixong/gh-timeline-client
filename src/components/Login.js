import React, { Component } from 'react';

class Login extends Component {

  constructor() {
    super()
    this.state = {
      name: '',
      email: '',
      password: '',
      password_confirmation: ''
    }
  }

  handleChange = e => {
    this.setState({
        [e.target.name]: e.target.value
    })
}

  handleSubmit = e => {
    console.log('submit here');
    
    fetch('http://localhost:3000/api/v1/users',{
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        user: {
          name: this.state.name,
          // email: this.state.email,
          password: this.state.password,
          password_confirmation: this.state.password_confirmation
        }
    })
  })
  .then(res => res.json())
  .then(json => console.log(json))
}

  render() {
    return <div>
      <h2>New User</h2>
      <form onSubmit={this.handleSubmit}>
        <label htmlFor='name'>Name</label>
        <input
          type="text"
          name="name"
          onChange={event => this.handleChange(event)}
        />

        <label htmlFor='email'>Email</label>
        <input
          type="text"
          name="email"
          onChange={event => this.handleChange(event)}
        />

        <label htmlFor='password'>Password</label>
        <input
          type="text"
          name="password"
          onChange={event => this.handleChange(event)}
        />

        <label htmlFor='password_confirmation'>Confirm Password</label>
        <input
          type="text"
          name="password_confirmation"
          onChange={event => this.handleChange(event)}
        />

        <button type="submit">Submit</button>

      </form>
    </div>
  }
}
export default Login;