import React, { Component } from 'react';

class Profile extends Component {

  state = {
    searchTerm: '',
    repos: []
  }

  handleChange = (e) => {
    this.setState({
      searchTerm: e.target.value
    })
  }

  handleClick = (e) => {
    e.preventDefault();
    console.log(e.target.searchTerm.value);
    fetch('http://localhost:3000/repos', {
      method: "POST",
      headers: {
        Authorization: `Bearer: ${localStorage.getItem('accessToken')}`,
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        github_username: this.state.searchTerm
      })
    })
      .then(res => res.json())
      // .then(json => console.log(json))
      .then(json => this.setState({
        repos: json
      }))
    // .then(json => this.props.sendToken(json.jwt))
  }

  render() {
    return <div className='container'>
      <div className='profile'>
        <h1>Welcome back {this.props.user.name}!</h1>
        <h3>Email:{this.props.user.email}</h3>
        <h3>Github Username: {this.props.user.git_username}</h3>
      </div>

      <div className='search'>

        <form onSubmit={this.handleClick}>
          <label htmlFor='searchTerm'>Search by Github Username</label>
          <input
            type="text"
            name="searchTerm"
            onChange={event => this.handleChange(event)}
            value={this.state.searchTerm}
          />
          <button type='submit'>Submit</button>
        </form>

      </div>
    </div>

  }
}
export default Profile;