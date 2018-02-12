import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

ReactDOM.render(
  <Router basename="/parcel-viewer">
    <Switch>
      <Route exact path='/' component={App} />
      <Route path='/:name' component={App} />
    </Switch>
  </Router>,
  document.getElementById('root'));
registerServiceWorker();