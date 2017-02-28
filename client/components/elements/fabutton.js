import React, {Component} from 'react';


class FabButton extends Component{
  constructor(props){
    super(props)
  }

  render(){
    return (<button className="fab" onClick={this.props.onClick}>+</button>)
  }
}

export default FabButton;
