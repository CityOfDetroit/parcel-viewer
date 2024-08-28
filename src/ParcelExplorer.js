import "./css/app.css";

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import AddressSearch from "./components/AddressSearch.js";
import Details from "./components/Details";
import Header from "./components/Header";
import Introduction from "./components/Introduction";
import Map from "./components/Map";
import StreetView from "./components/StreetView";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faGithub} from '@fortawesome/free-brands-svg-icons'
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import Disclaimer from "./components/Disclaimer.js";

const SidebarFooter = () => {
  return (
    <div className="px-2 flex justify-between items-center bg-det-gray text-sm" style={{gridArea: 'f'}}>
      <span>City of Detroit, {new Date().getFullYear()}. <a href="https://airtable.com/shrInZsfyRoJvq8GJ" className="underline text-gray-700 hover:text-blue-600">feedback form</a></span>
      <a href="https://www.github.com/CityOfDetroit/parcel-viewer/"><FontAwesomeIcon icon={faGithub} /></a>
    </div>
  )
}

const SiteRetired = ({ parcel }) => { 
  
  let newRootUrl = `https://base-unit-tools.netlify.app/`

  return (
  <div className="px-4 py-4 font-semibold bg-red-400 text-sm" style={{background: 'rgba(200,20,20,0.9)', padding: '10px', color: 'white', fontWeight: 500}}>
  <h3 style={{borderBottom: 'none', marginBottom: '1em'}}>
    <FontAwesomeIcon icon={faExclamationTriangle} className="mr-2" />
    This tool will soon be retired! 
  </h3>
  <p className="font-normal" style={{margin: '.5em 0'}}>
    Please migrate to the <a href={`${newRootUrl}/map?id=${parcel}&type=parcels&layers=parcels&basemap=satellite`} className="underline">Base Unit Tools site</a> for parcel information, and change your bookmarks.
  </p>
  
  <p className="font-normal" style={{margin: '.5em 0'}}>
  The <b>new URL</b> for the page you are currently viewing is:
  </p>
  
  <p style={{margin: '1em 0 .5em 0', background: 'rgb(230,230,230)', padding: '.5em', color: 'blue'}} className="w-full font-mono">
    <a href={`${newRootUrl}/parcel-viewer?id=${parcel}&type=parcels&basemap=satellite`} className="underline text-xs font-thin">https://base-unit-tools.netlify.app/parcel-viewer?id={parcel}&type=parcels&basemap=satellite</a>
  </p>
</div>
)}

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
  const [showSv, setSv] = useState(false);
  const [svCoords, setSvCoords] = useState(null);
  const [svBearing, setSvBearing] = useState(null);
  const [showInfo, setInfo] = useState(localStorage.getItem("showInfo") || false);
  const [showSearch, setSearch] = useState(mobile ? false : true)
  const [showSatellite, setSatellite] = useState(true)

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

  let [disclaimed, setDisclaimed] = useState(localStorage.getItem("disclaimed") || false);
  let [intro, setIntro] = useState(localStorage.getItem("intro") || false);

  return (
    !disclaimed ? <Disclaimer {...{setDisclaimed}} /> : 
    <div className={!mobile ? "App" : "MobileApp"}>
      <Header {...{setSearch, showSearch, showInfo, setInfo, setParcel, showSv, setSv, showSatellite, setSatellite, mobile}}>
        {/* {parcel && <SiteRetired parcel={parcel} />} */}
        {showInfo && <Introduction {...{setInfo, showInfo, disclaimed, setDisclaimed}}/>}
        {showSearch && <AddressSearch {...{ parcel, setParcel, setCoords, setSearch, showSearch }} />}
      </Header>
      <div id="sidebar">
      {showSv && (
        <StreetView {...{ coords, width, height, setSvBearing, setSvCoords }} />
        )}
        {parcel && <Details {...{ parcel, setCoords, mobile }} />}
      </div>
      <SidebarFooter />
      <div className="map-view">
      {((mobile && map) || !mobile) && (
        <Map {...{ parcel, setParcel, width, coords, svCoords, svBearing, showSv, showSatellite }} />
        )}

      </div>
    </div>
  );
};

export default ParcelExplorer;
 