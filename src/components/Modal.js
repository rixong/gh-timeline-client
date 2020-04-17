import React from 'react'
import { Button, Header, Modal } from 'semantic-ui-react'
import moment from 'moment'

class ModalModalExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      repo: this.props.repo,
      modalState: this.props.modalState
    }
  }

  render() {
    return (
      // <Modal trigger={<Button>Show Modal</Button>}>
      <Modal size='tiny' open={this.props.modalState}>
        {/* <Modal.Header>Select a Photo</Modal.Header> */}
        <Modal.Content image>
          <Modal.Description>
            <Header>{this.state.repo.name}</Header>
            <ul>
              <li>Creator: <strong>{this.state.repo.git_username}</strong></li>
              <li>Repo Created: {moment(this.state.repo.repo_created_at).format('MMMM Do YYYY')}</li>
              <li>Repo Updated: {moment(this.state.repo.repo_updated_at).format('MMMM Do YYYY')}</li>
              <li>Git ID: {this.state.repo.git_id}</li>
              <li>Repo URL: <a href={this.state.repo.html_url} target="_blank" rel="noopener noreferrer">Click to open repo    </a></li>
            </ul>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    )
  }
}
export default ModalModalExample