import React, {PropTypes} from 'react';
import {ModalContainer, ModalDialog} from 'react-modal-dialog';

class Popup extends React.Component {
  render() {
    return <div onClick={this.handleClick}>
      {
        this.props.isShowingModal &&
        <ModalContainer backgroundColor="rgba(0, 0, 0, 0.25)" onClose={this.props.handleClose}>
          <ModalDialog className="model" onClose={this.props.handleClose}>
            <h1>Dialog Content</h1>
            <p>More Content. Anything goes here</p>
          </ModalDialog>
        </ModalContainer>
      }
    </div>;
  }
}

export default Popup;
