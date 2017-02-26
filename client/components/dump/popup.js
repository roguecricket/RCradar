import React from 'react';
import Rodal from 'rodal';

import 'rodal/lib/rodal.css';
import '../../../assets/css/popover.css';

class PopOver extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Rodal  height={240} visible={this.props.isShowingModal} onClose={this.props.handleClose}>
                  <div className="header">{this.props.title}</div>
                  <div style={{marginBottom: 10}}>{this.props.children}</div>
                  <button className="rodal-confirm-btn" onClick={this.props.onOk}>{this.props.successButton}</button>
                  <button className="rodal-cancel-btn" onClick={this.props.onCancel}>{this.props.cancelButton}</button>
                </Rodal>
            </div>
        )
    }
}

PopOver.defaultProps = {
  successButton: 'ok',
  cancelButton: 'close'
}

export default PopOver;
