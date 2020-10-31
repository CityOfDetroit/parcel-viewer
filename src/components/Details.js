import centroid from "@turf/centroid";
import React, { useEffect, useState } from "react";
import { convert, parse } from "terraformer-arcgis-parser";

import DetailsTable from "./DetailsTable";
import SectionH3 from "./SectionH3";

const Details = ({ parcel, setCoords, mobile, children }) => {
  let [parcelData, setParcelData] = useState(null);
  const [loadScreen, setLoadScreen] = useState(false);

  // function to fetch data; returns a fetch Promise
  const fetchData = (parcel) => {
    // object to hold URL query string parameters
    let params = {
      outFields: "*",
      outSR: 4326,
      f: "json",
      where: `parcel_number='${parcel}'`,
    };

    // service URL for parcel layer
    let url = `https://gis.detroitmi.gov/arcgis/rest/services/OpenData/Parcels/FeatureServer/0/query?`;

    // loop through params keys, make URI encoded string, join with &s
    let queryString = Object.keys(params)
      .map((k) => `${k}=${encodeURIComponent(params[k])}`)
      .join("&");

    return fetch(url + queryString);
  };

  useEffect(() => {
    setLoadScreen(true);
    fetchData(parcel)
      .then((response) => response.json())
      .then((d) => {
        console.log(d);
        let geojson = parse(d.features[0].geometry);
        let coordinates = centroid(geojson).geometry.coordinates;
        let coords = {
          y: coordinates[1],
          x: coordinates[0],
        };
        setCoords(coords);
        console.log("Selected parcel: ", d.features[0]);
        setParcelData(d.features[0]);
        setLoadScreen(false);
      });
  }, [parcel]);

  return (
    <section className={`details m-1`}>
      {parcelData ? (
        <>
          <div>
            <table className="bg-det-gray mb-1">
              <thead>
                <tr className="">
                  <td>Parcel ID: {parcelData.attributes.parcel_number}</td>
                  <td>
                    Address: <b>{parcelData.attributes.address}</b>
                  </td>
                </tr>
              </thead>
            </table>
          </div>
          <DetailsTable parcelData={parcelData.attributes} mobile={mobile} />
        </>
      ) : (
        <>{children}</>
      )}
    </section>
  );
};

export default Details;
