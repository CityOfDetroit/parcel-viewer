import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import ReactGA from 'react-ga';
import PropTypes from 'prop-types'
ReactGA.initialize('UA-107915075-6');

class GAListener extends React.Component {
  static contextTypes = {
    router: PropTypes.object
  };

  componentDidMount() {
    this.sendPageView(this.context.router.history.location);
    this.context.router.history.listen(this.sendPageView);
  }

  sendPageView(location) {
    ReactGA.set({ page: location.pathname });
    ReactGA.pageview(location.pathname);
  }

  render() {
    return this.props.children;
  }
}

ReactDOM.render(
  <Router>
    <GAListener>
      <Switch>
        <Route exact path='/' component={App} />
        <Route path='/:name' component={App} />
      </Switch>
    </GAListener>
  </Router>,
  document.getElementById('root'));
registerServiceWorker();