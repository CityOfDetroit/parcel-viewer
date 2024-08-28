import {
  faCalendarAlt,
  faGlobe,
  faMapMarked,
  faStreetView,
  faWindowClose,
} from "@fortawesome/free-solid-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

import { HeaderButton } from "./HeaderButton";

const IntroPara = ({ children }) => {
  return <p className="py-2 text-sm">{children}</p>;
};

const Introduction = ({ setInfo, showInfo, setDisclaimed }) => {
  return (
    <section className="details introduction px-2 py-2 bg-det-gray bg-opacity-50 rounded overflow-y-auto">
      <div className="flex items-center align-top justify-between">
        <h1 className="text-lg">Welcome to the new Parcel Viewer</h1>
        <HeaderButton
          icon={faWindowClose}
          onClick={() => {
            localStorage.setItem("showInfo", false);
            setInfo(!showInfo);
          }}
        />
      </div>
      <IntroPara>
        You can use this application to look up information about parcels in the
        City of Detroit.
      </IntroPara>
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
          Switch between different imagery <b>capture dates</b>
          <FontAwesomeIcon icon={faCalendarAlt} className="mx-2" />
          using the date picker
        </li>
      </ul>
      <IntroPara>
        You can also switch the map baselayer to <b>satellite imagery</b>
        <FontAwesomeIcon icon={faGlobe} className="mx-2" />
      </IntroPara>
      <IntroPara>
        Do you have questions or comments about this tool? Tell us using our{" "}
        <a
          href="https://airtable.com/shrInZsfyRoJvq8GJ"
          className="underline text-gray-700 hover:text-blue-600"
        >
          feedback form
        </a>{" "}
        or please open a{" "}
        <a
          href="https://github.com/CityOfDetroit/parcel-viewer/issues"
          className="underline text-gray-700 hover:text-blue-600"
        >
          GitHub issue
        </a>
        .
      </IntroPara>
      <button className="underline text-gray-700 hover:text-blue-600" onClick={() => setDisclaimed(false)} >
        View full disclaimer
      </button>
    </section>
  );
};

export default Introduction;
