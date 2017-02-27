import React, {Component, PropTypes} from 'react';
import DevTools from '../../devtool';

const isProduction = process.env.NODE_ENV === 'production';

class App extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return(<div>
         {this.props.children}
         {!isProduction && <DevTools />}
      </div>)
  }
}

export default App;
