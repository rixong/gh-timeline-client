import React, { Component } from 'react';
import Modal from './Modal'

class ModalContainer extends Component {

  constructor(props) {
    super(props)
    this.state = {
      modalDisplay: this.props.clicked.modalDisplay
    }
  }

  toggleModal = () => {
  //     console.log(this.props.clickedRepo, this.props.repo.git_id);
  // if the ids match pass true else false (closes any open Modal)
      
      if (this.props.clicked.clickedRepo === this.props.repo.git_id) {
        return true;
      } else {
        return false;
      }
  }

  render() {
    return <div><Modal repo={this.props.repo} modalDisplay={this.toggleModal()} /></div>
  }
}
export default ModalContainer;