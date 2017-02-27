import {Router, Route, IndexRoute, Link, browserHistory} from 'react-router';
import Map from './components/dump/map';
import App from './components/smart/App';

const routes = (
  <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Map} />
      </Route>
  </Router>
)

export default routes;
