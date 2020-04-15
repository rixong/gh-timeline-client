import React, { Component } from 'react';
import Timeline from './Timeline'

class Profile extends Component {

  state = {
    searchTerm: '',
    repos: [],
    timelines: []
  }

  componentDidMount() {
    fetch('http://localhost:3000/timelines', {
      method: "GET",
      headers: {
        Authorization: `Bearer: ${localStorage.getItem('accessToken')}`,
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    })
      .then(res => res.json())
      // .then(json => console.log(json))
      .then(json => {
        this.setState({ timelines: json });
      })
  }

  makeSelectionList = () => {
    return this.state.timelines.map((item, idx) => <option key={idx} value={item.name} >{item.name}</option>)
  }

  handleSelectionChange = (e) => {
    console.log(e.target.value);
    this.setState({ searchTerm: e.target.value })
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
        repos: json.result
      })
      )
  }

  render() {
    return <div className='container'>

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
        <select onChange={this.handleSelectionChange}>
          {this.makeSelectionList()}
        </select>
      </div>
      
      {this.state.repos.length > 0 ? <Timeline repos={this.state.repos} /> : null}

    </div>

  }
}
export default Profile;