import {Router, Route, IndexRoute, Link, browserHistory} from 'react-router';
import Map from './components/elements/map'; // should be moved to containers soon
import App from './components/containers/App';

const routes = (
  <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Map} />
      </Route>
  </Router>
)

export default routes;
