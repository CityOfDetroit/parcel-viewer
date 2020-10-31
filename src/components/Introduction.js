import { faCalendarAlt, faMapMarked, faStreetView, faWindowClose } from "@fortawesome/free-solid-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

import { HeaderButton } from "./HeaderButton";
import SectionH3 from "./SectionH3";

const IntroPara = ({ children }) => {
  return <p className="py-2 text-sm">{children}</p>;
};

const Introduction = ({ setInfo, showInfo }) => {
  return (
    <section className="details introduction px-2 py-2 bg-det-gray bg-opacity-50 rounded overflow-y-auto">
      <div className="flex items-center align-top justify-between">
        <h1 className="text-lg">Welcome to the new Parcel Viewer</h1>
        <HeaderButton
          icon={faWindowClose}
          onClick={() => {
            setInfo(!showInfo)
          }}
        />
      </div>
      <IntroPara>You can use this application to look up information about parcels in the City of Detroit.</IntroPara>
      <IntroPara>You can find information about parcels in two ways:</IntroPara>
      <ul className="list-disc list-inside ml-2 py-2 text-sm">
        <li>
          <b>Search</b>
          <FontAwesomeIcon icon={faSearch} className="mx-2" />
          for an address or parcel ID using the search box above
        </li>
        <li>
          Click a parcel on the <b>map</b>
          <FontAwesomeIcon icon={faMapMarked} className="mx-2" />
        </li>
      </ul>
      <IntroPara>
        You can see the latest <b>Street View</b>
        <FontAwesomeIcon icon={faStreetView} className="mx-2" />
        imagery for the parcel you selected:
      </IntroPara>
      <ul className="list-disc list-inside ml-2 py-2 text-sm">
        <li>
          On a phone or tablet, tap the icon to switch between <b>map</b>
          <FontAwesomeIcon icon={faMapMarked} className="mx-2" />
          or{" "}
          <b>
            street view
            <FontAwesomeIcon icon={faStreetView} className="mx-2" />
          </b>
        </li>
        <li>
          Switch between different imagery <b>capture dates</b>
          <FontAwesomeIcon icon={faCalendarAlt} className="mx-2" />
          using the date picker
        </li>
      </ul>
      <IntroPara>Do you have feedback about this tool? We accept feedback and GitHub issues.</IntroPara>
    </section>
  );
};

export default Introduction;
