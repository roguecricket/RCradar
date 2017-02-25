import {Router, Route, Link, browserHistory} from 'react-router';
import Map from './components/dump/map';

const routes = (
  <Router history={browserHistory}>
      <Route path="/" component={Map}/>
  </Router>
)

export default routes;
