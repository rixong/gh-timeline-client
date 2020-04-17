import React, { Component } from 'react';
import Timeline from './Timeline'

class Profile extends Component {

  state = {
    inputText: '',
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

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchTerm !== '') {
      this.setState({searchTerm: ''})
    }
  }

  makeSelectionList = () => {
    return this.state.timelines.map((item, idx) => <option key={idx} value={item.name} >{item.name}</option>)
  }

  // handleSelectionChange = (e) => {
  //   console.log(e.target.value);
  //   this.setState({ searchTerm: e.target.value })
  // }

  handleSelectionChange = (e) => {
    console.log(e.target.value);
    this.setState({ 
      searchTerm: e.target.value ,
    }, () => this.fetchRepos())
  }

  handleChange = (e) => {
    this.setState({
      inputText: e.target.value
    })
  }

  handleClick = (e) => {
    e.preventDefault();
    // console.log(e.target.searchTerm.value);
    this.setState({ searchTerm: this.state.inputText }, () => this.fetchRepos())
  }

  fetchRepos = () => {    
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
        repos: json.result,
        inputText: ''
      })
      )
  } 


  render() {
    return <div className='container'>

<div id='search-bar'>
        <div id="timeline-selector">
          <select onChange={this.handleSelectionChange}>
            <option value='' >Saved Timelines</option>
            {this.makeSelectionList()}
          </select>
        </div>
        <div id="search-form">
          <form onSubmit={this.handleClick}>
            <label htmlFor='searchTerm'>Search by Github Username</label>
            <input
              type="text"
              name="searchTerm"
              onChange={event => this.handleChange(event)}
              value={this.state.inputText}
            />
            <button type='submit'>Submit</button>
          </form>
        </div>
      </div>

      {this.state.repos.length > 0 ? <Timeline repos={this.state.repos} /> : null}

    </div>

  }
}
export default Profile;