import { faExchangeAlt, faSearch, faWindowClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { HeaderButton } from "./HeaderButton";

function AddressSearch({ setCoords, setSearch, setParcel }) {
  const [dataSource, setDataSource] = useState([]);
  const [value, setValue] = useState("");
  const [hasFocus, setHasFocus] = useState(false);
  const [searchField, setSearchField] = useState("address");
  let history = useHistory();

  const GEOCODER = `https://opengis.detroitmi.gov/arcgis/rest/services/BaseUnits/BaseUnitGeocoder/GeocodeServer`

  const suggestAddress = (value) => {
    if (value !== "") {
      fetch(`${GEOCODER}/suggest?text=${value}&f=pjson`)
        .then((r) => r.json())
        .then((d) => {
          d.suggestions.length < 1 ? setDataSource({ text: value }) : setDataSource(d.suggestions.map((s) => s.text));
        });
    }
  };

  const handleSearch = (value) => {
    suggestAddress(value);
    setValue(value);
    console.log(dataSource)
  };

  const onSearchSelect = (value) => {
    const url = `${GEOCODER}/findAddressCandidates?SingleLine=${value}&outSR=4326&outFields=*&f=pjson`;
    fetch(url)
      .then((r) => r.json())
      .then((d) => {
        if (d.candidates.length > 0) {
          let { attributes, location } = d.candidates[0];
          if (attributes["parcel_id"]) {
            setParcel(attributes["parcel_id"]);
          } else {
            console.log("not found!");
            setParcel(null);
          }
          setCoords(location);
        }
      });
  };

  return (
    <section className={hasFocus ? `address-search py-2 px-2 bg-det-gray rounded w-full text-gray-900` : `address-search py-2 px-2 bg-det-gray rounded w-full text-gray-600`}>

      <div className="flex items-center">
        <input
          className="bg-white mb-2 focus:outline-none font-lg p-1 focus:shadow-outline border border-gray-300 rounded-lg block w-full appearance-none leading-normal"
          onChange={(e) => (searchField === "address" ? handleSearch(e.target.value) : setParcel(null))}
          onKeyDown={(e) => e.keyCode === 13 && (searchField === "address" ? onSearchSelect(value) : setParcel(e.target.value)
          )}
          onFocus={(e) => {
            console.log(e);
            setHasFocus(true);
          }}
          onBlur={(e) => {
            console.log(e);
            setHasFocus(false);
          }}
        ></input>
                <HeaderButton
          icon={faWindowClose}
          onClick={() => { setSearch(false)
          
          }}
          className="ml-2"
          />
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
        <label className={`inline-block text-sm flex items-center mr-2`}>Search by:</label>
        <select onChange={(e) => setSearchField(e.target.value)}>
          <option value="address" className="p-2">address</option>
          <option value="parcel ID">Parcel ID</option>
        </select> 
       </div>
      </div>
    </section>
  );
}

export default AddressSearch;
