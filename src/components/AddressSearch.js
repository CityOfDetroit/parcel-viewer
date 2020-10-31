import { faExchangeAlt, faSearch, faWindowClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

import { HeaderButton } from "./HeaderButton";

function AddressSearch({ setCoords, setSearch, setParcel }) {
  const [dataSource, setDataSource] = useState([]);
  const [value, setValue] = useState("");
  const [hasFocus, setHasFocus] = useState(false);
  const [searchField, setSearchField] = useState("address");

  const suggestAddress = (value) => {
    if (value !== "") {
      fetch(`https://gis.detroitmi.gov/arcgis/rest/services/DoIT/AddressPointGeocoder/GeocodeServer/suggest?text=${value}&f=pjson`)
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
    const url = `https://gis.detroitmi.gov/arcgis/rest/services/DoIT/CompositeGeocoder/GeocodeServer/findAddressCandidates?SingleLine=${value}&outSR=4326&outFields=*&f=pjson`;
    fetch(url)
      .then((r) => r.json())
      .then((d) => {
        if (d.candidates.length > 0) {
          let { attributes, location } = d.candidates[0];
          if (attributes["User_fld"]) {
            setParcel(attributes["User_fld"]);
          } else {
            console.log("not found!");
            setParcel(null);
          }
          setCoords(location);
        }
      });
  };

  return (
    <section className={`address-search py-2 px-2 bg-det-gray rounded w-full text-gray-${hasFocus ? 900 : 600}`}>

      <div className="flex items-center">
        <input
          className="bg-white focus:outline-none font-lg p-1 focus:shadow-outline border border-gray-300 rounded-lg block w-full appearance-none leading-normal"
          onChange={(e) => (searchField === "address" ? handleSearch(e.target.value) : setParcel(null))}
          onKeyDown={(e) => e.keyCode === 13 && (searchField === "address" ? onSearchSelect(value) : setParcel(e.target.value))}
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

        <label className={`inline-block text-sm flex items-center`}>
          Search by {searchField}
        </label>
        <HeaderButton
          icon={faExchangeAlt}
          onClick={() => {
            searchField === "address" ? setSearchField("parcel ID") : setSearchField("address");
          }}
          className="ml-2"
          />
          </div>

      </div>
    </section>
  );
}

export default AddressSearch;
