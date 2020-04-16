import React from 'react'
import { Button, Header, Modal } from 'semantic-ui-react'
import moment from 'moment'

const ModalModalExample = (props) => (
  <Modal size='tiny' open={props.modalState}>
    <Modal.Header></Modal.Header>
    <Modal.Content image>
      {/* <Image wrapped size='medium' src='/images/avatar/large/rachel.png' /> */}
      <Modal.Description>
        <Header>Repo Name: {props.repo.name}</Header>
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