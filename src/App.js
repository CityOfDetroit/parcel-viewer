import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
} from "react-router-dom";

const BASE_URL = "https://baseunits.detroitmi.gov/map";

function Redirect() {
  const { pid } = useParams();
  const url = pid
    ? `${BASE_URL}?id=${pid}&type=parcel&mode=parcel`
    : `${BASE_URL}?type=parcel&mode=parcel`;

  useEffect(() => {
    window.location.replace(url);
  }, [url]);

  return null;
}

export default function App() {
  return (
    <Router basename="/parcel-viewer">
      <Switch>
        <Route path="/:pid" children={<Redirect />} />
        <Route path="/">
          <Redirect />
        </Route>
      </Switch>
    </Router>
  );
}
