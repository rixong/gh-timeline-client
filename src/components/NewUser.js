import React, { Component } from 'react';
import LinkButton from './LinkButton'

class NewUser extends Component {

  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
      password_confirmation: '',
      name: '',
      git_username: '',
      git_userid: '',
    }
  }

  handleChange = e => {
    this.setState({
        [e.target.name]: e.target.value
    })
}

  handleSubmit = e => {
    e.preventDefault();
    console.log('create user here');
  
    fetch('http://localhost:3000/api/v1/users',{
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        user: {
          email: this.state.email,
          password: this.state.password,
          password_confirmation: this.state.password_confirmation,
          name: this.state.name,
          git_username: this.state.git_username,
          git_id: this.state.git_id
        }
    })
  })
  .then(res => res.json())
  // .then(json => console.log(json.jwt))
  .then(json => {
    this.props.sendToken(json.jwt)
  })
}

  render() {
    return <div>

      <h2>New User</h2>
      <form onSubmit={this.handleSubmit}>
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

        <label htmlFor='password_confirmation'>Confirm Password</label>
        <input
          type="text"
          name="password_confirmation"
          onChange={event => this.handleChange(event)}
          value={this.state.password_confirmation}
          />

        <label htmlFor='name'>Name</label>
        <input
          type="text"
          name="name"
          onChange={event => this.handleChange(event)}
          value={this.state.name}
        />

        <label htmlFor='git_username'>Github Username</label>
        <input
          type="text"
          name="git_username"
          onChange={event => this.handleChange(event)}
          value={this.state.git_username}
        />

        <LinkButton to='/signup'>Signup</LinkButton>

      </form>
    </div>
  }
}
export default NewUser;