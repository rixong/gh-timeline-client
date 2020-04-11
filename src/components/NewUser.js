import React, { Component } from 'react';

class NewUser extends Component {

  constructor() {
    super()
    this.state = {
      username: '',
      password: '',
      password_confirmation: '',
      bio: '',
      token: ''
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
          username: this.state.username,
          password: this.state.password,
          password_confirmation: this.state.password_confirmation,
          bio: this.state.bio
          // email: this.state.email,
        }
    })
  })
  .then(res => res.json())
  // .then(json => console.log(json.jwt))
  .then(json => {
    console.log(json);
    this.setState({token: json.jwt})
    })
}

handleClick = () => {
  fetch('http://localhost:3000/api/v1/profile', {
  method: 'GET',
  headers: {
    Authorization: `Bearer: ${this.state.token}`
  }
})
}

  render() {
    return <div>

      <h2>New User</h2>
      <form onSubmit={this.handleSubmit}>
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

        <label htmlFor='password_confirmation'>Confirm Password</label>
        <input
          type="text"
          name="password_confirmation"
          onChange={event => this.handleChange(event)}
          value={this.state.password_confirmation}
          />

        <label htmlFor='bio'>Bio</label>
        <input
          type="text"
          name="bio"
          onChange={event => this.handleChange(event)}
          value={this.state.bio}
        />
        <button type="submit">Submit</button>

      </form>

<br></br>
      <button onClick={this.handleClick}>Click to see profile info</button>
    </div>
  }
}
export default NewUser;