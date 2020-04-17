import React, { Component } from 'react';
import { Button, Checkbox, Form } from 'semantic-ui-react'

const genderOptions = [
  { key: 'm', text: 'Male', value: 'male' },
  { key: 'f', text: 'Female', value: 'female' },
  { key: 'o', text: 'Other', value: 'other' },
]

class FormExampleFieldControlId extends Component {

  constructor(props) {
    super(props)
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
    return <div>
   <Form onSubmit={this.handleSubmit}>
    <Form.Field>
      <label>User Name</label>
      <input placeholder='Username' />
    </Form.Field>
    <Form.Field>
      <label>E-mail</label>
      <input placeholder='E-mail' />
    </Form.Field>
    <Form.Field>
      <label>Password</label>
      <input type='password' />
    </Form.Field>
    <Form.Field>
      <label>Password Confirmation</label>
      <input type='password' />
    </Form.Field>
    <Form.Field>
      <label>GitHub Username</label>
      <input placeholder='GitHub Username' />
    </Form.Field>
    <Button type='submit'>Submit</Button>
  </Form>
    </div>
  }
}

export default FormExampleFieldControlId
