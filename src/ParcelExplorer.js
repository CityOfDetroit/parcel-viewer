import "./css/App.css";

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import AddressSearch from "./components/AddressSearch.js";
import Details from "./components/Details";
import Header from "./components/Header";
import Introduction from "./components/Introduction";
import Map from "./components/Map";
import StreetView from "./components/StreetView";
import SVToggle from "./components/SVToggle";

const ParcelExplorer = () => {
  // get the parcel ID from the URL
  let { pid } = useParams();

  // screen size hooks: we need to change behavior for mobile/etc
  const breakpoint = 640;
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);
  const [mobile, setMobile] = useState(width < breakpoint);

  // app state
  const [parcel, setParcel] = useState(pid ? pid : null);
  const [coords, setCoords] = useState(null);
  const [map, setMap] = useState(true);
  const [svCoords, setSvCoords] = useState(null);
  const [svBearing, setSvBearing] = useState(null);
  const [showInfo, setInfo] = useState(mobile ? false : true)
  const [showSearch, setSearch] = useState(mobile ? false : true)

  // TODO
  const basemaps = {
    Streets: "mapbox://styles/cityofdetroit/cke9czg0d5wfq1atbqtbwbt9e",
    Satellite: "mapbox://styles/mapbox/satellite-v9",
  };
  const [basemap, setBasemap] = useState(basemaps.Streets);

  // Roll our own media-query hook:
  useEffect(() => {
    const handleWindowResize = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
      setMobile(window.innerWidth < breakpoint);
    };
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  return (
    <div className={!mobile ? "App" : "MobileApp"}>
      <Header {...{setSearch, showSearch, showInfo, setInfo, setParcel, mobile}}>
        {showInfo && <Introduction {...{setInfo, showInfo}}/>}
        {showSearch && <AddressSearch {...{ parcel, setParcel, setCoords, setSearch, showSearch }} />}
      </Header>
      <div id="sidebar">
        {parcel && <Details {...{ parcel, setCoords, mobile }} />}
      </div>
      {((mobile && map) || !mobile) && (
        <Map {...{ parcel, setParcel, width, basemap, coords, svCoords, svBearing }}>{mobile && map && <SVToggle {...{ setMap, map, parcel }} />}</Map>
      )}
      {((mobile && !map) || !mobile) && coords && (
        <StreetView {...{ coords, width, height, setSvBearing, setSvCoords }}>{mobile && !map && <SVToggle {...{ setMap, map, parcel }} />}</StreetView>
      )}
    </div>
  );
};

export default ParcelExplorer;
