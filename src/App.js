import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import ParcelExplorer from './ParcelExplorer';

export default function App() {
  return (
    <Router basename='/parcel-viewer'>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/:pid" children={<ParcelExplorer />} />
          <Route path="/">
            <ParcelExplorer />
          </Route>
        </Switch>
    </Router>
  );
}
