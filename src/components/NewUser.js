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

    fetch('http://localhost:3000/api/v1/users', {
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
    return <div id="new-user-container">

      <h2>New User Signup</h2>
      <form className="ui inverted form" onSubmit={this.handleSubmit}>

        <div className='field'>
          <label htmlFor='email'>Email</label>
          <input
            type="text"
            name="email"
            onChange={event => this.handleChange(event)}
            value={this.state.email}
          />
        </div>

        <div className='two fields'>
          <div className='field'>
            <label htmlFor='password'>Password</label>
            <input
              type="text"
              name="password"
              onChange={event => this.handleChange(event)}
              value={this.state.password}
            />
          </div>
          <div className='field'>
            <label htmlFor='password_confirmation'>Confirm Password</label>
            <input
              type="text"
              name="password_confirmation"
              onChange={event => this.handleChange(event)}
              value={this.state.password_confirmation}
            />
          </div>
        </div>

        <div className='field'>
          <label htmlFor='name'>Name</label>
          <input
            type="text"
            name="name"
            onChange={event => this.handleChange(event)}
            value={this.state.name}
          />
        </div>

        <div className='field'>
          <label htmlFor='git_username'>Github Username</label>
          <input
            type="text"
            name="git_username"
            onChange={event => this.handleChange(event)}
            value={this.state.git_username}
          />
        </div>

        <br></br>
        <LinkButton to='/signup'>Signup</LinkButton>

      </form>
    </div>
  }
}
export default NewUser;