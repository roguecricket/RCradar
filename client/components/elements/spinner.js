import React, {PropTypes} from 'react';
import Spinner from 'spin.js';

export default class ReactSpinner extends React.Component {
  componentDidMount() {
    const {color, config} = this.props;
    const spinConfig = {
      width: 2,
      radius: 10,
      length: 7,
      scale:5.75,
      color,
      ...config,
    };
    this.spinner = new Spinner(spinConfig);
    this.spinner.spin(this.refs.container);
  }
  componentWillUnmount() {
    this.spinner.stop();
  }
  render() {
    return <span ref="container"/>;
  }
}
