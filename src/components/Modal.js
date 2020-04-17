import React from 'react'
import { Header, Modal } from 'semantic-ui-react'
import moment from 'moment'

const ModalModalExample = (props) => (
  <Modal open={props.modalDisplay}>
    <Modal.Content image>
      <Modal.Description>
        <Header>{props.repo.name}</Header>
        <ul>
        <li>Creator: <strong>{props.repo.git_username}</strong></li>
        <li>Repo Created: {moment(props.repo.repo_created_at).format('MMMM Do YYYY')}</li>
        <li>Repo Updated: {moment(props.repo.repo_updated_at).format('MMMM Do YYYY')}</li>
        <li>Git ID: {props.repo.git_id}</li>
        <li>Repo URL: <a href={props.repo.html_url} target="_blank" rel="noopener noreferrer">Click to open repo    </a></li>
        </ul>
      </Modal.Description>
    </Modal.Content>
  </Modal>
)

export default ModalModalExample