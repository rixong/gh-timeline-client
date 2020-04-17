import React from 'react'
import Modal from './Modal';
import { Button, Grid } from 'semantic-ui-react';

class ModalSection extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      modal: false,
      repo: this.props.repo
    }
  }

  render() {
    return([
        <Button // Button to click to activate the Modal
          key='button1'
          primary
          content='Click!'
          onClick={
            () => {
              this.setState({ modal: true })
            }
          }
        />,
        <Modal // The invisible modal itself
          key='modal1'
          modalOpen={this.state.modalOpen}
          handleClose={
            () => {
              this.setState({ modal: false })
            }
          }
          repo={this.props.repo}
        />
    ])
  }
}

export default ModalSection