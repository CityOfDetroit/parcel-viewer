import React, {} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Analytics from 'react-router-ga';
import ParcelExplorer from './ParcelExplorer';

const trackingId = 'UA-107915075-6'

export default function App() {
  return (

    <Router basename='/parcel-viewer'>
          <Analytics id={trackingId} debug>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/:pid" children={<ParcelExplorer />} />
          <Route path="/">
            <ParcelExplorer />
          </Route>
        </Switch>
        </Analytics>
    </Router>
  );
}
