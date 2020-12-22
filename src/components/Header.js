import React from "react";

import logo from "../img/logo.png";
import {HeaderButton} from './HeaderButton';
import { faGlobe, faInfoCircle, faSearch, faStreetView } from "@fortawesome/free-solid-svg-icons";

const Header = ({ showSearch, setSearch, showInfo, setInfo, showSv, setSv, showSatellite, setSatellite, mobile, children }) => {
  return (
    <header>
      <div className="flex items-center mx-1 mb-1">
        <img src={logo} className="h-12" />
        <h1 className="text-xl w-full ml-2">Parcel Viewer</h1>
      </div>
      <div className="flex items-center justify-end mb-1">
        <HeaderButton icon={faInfoCircle} active={showInfo} onClick={() => {setInfo(!showInfo)}}/>
        <HeaderButton icon={faSearch} active={showSearch} onClick={() => {setSearch(!showSearch)}}/>
        <HeaderButton icon={faStreetView} active={showSv} onClick={() => {setSv(!showSv)}}/>
        <HeaderButton icon={faGlobe} active={showSatellite} onClick={() => {setSatellite(!showSatellite)}}/>
      </div>
      {/* {mobile &&
        <div className="flex items-center mr-3">
          <img src={logo} className="h-12" />
          <h1 className="text-xl w-full mx-2">Parcel Viewer</h1>
          <HeaderButton icon={faInfoCircle} active={showInfo} onClick={() => {setInfo(!showInfo)}}/>
          <HeaderButton icon={faSearch} active={showSearch} onClick={() => {setSearch(!showSearch)}}/>
        </div>
      } */}
      <section className="pl-1 panels-area">
        {children}
      </section>
    </header>
  );
};
export default Header;
