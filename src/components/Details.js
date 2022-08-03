import centroid from "@turf/centroid";
import React, { useEffect, useState } from "react";
import { convert, parse } from "terraformer-arcgis-parser";

import DetailsTable from "./DetailsTable";
import SectionH3 from "./SectionH3";

const Details = ({ parcel, setCoords, mobile, children }) => {
  let [parcelData, setParcelData] = useState(null);
  let [parcelApiData, setParcelApiData] = useState(null);
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
    let url = `https://services2.arcgis.com/qvkbeam7Wirps6zC/arcgis/rest/services/Parcels_Current/FeatureServer/0/query?`;

    // loop through params keys, make URI encoded string, join with &s
    let queryString = Object.keys(params)
      .map((k) => `${k}=${encodeURIComponent(params[k])}`)
      .join("&");

    return fetch(url + queryString);
  };

  const fetchApiData = (parcel) => {
    return fetch(`https://apis.detroitmi.gov/assessments/parcel/${parcel}/`)
  }

  useEffect(() => {
    setLoadScreen(true);
    fetchData(parcel)
      .then((response) => response.json())
      .then((d) => {
        fetchApiData(parcel)
          .then(resp => resp.json())
          .then(data => {
            console.log(d, data);
            if(d.features.length > 0) {
              let geojson = parse(d.features[0].geometry);
              let coordinates = centroid(geojson).geometry.coordinates;
              let coords = {
                y: coordinates[1],
                x: coordinates[0],
              };
              setCoords(coords);
              console.log("Selected parcel: ", d.features[0]);
              setParcelData(d.features[0]);
              setParcelApiData(data)
              setLoadScreen(false);
            }
            else {
              console.log('Parcel not found')
              setParcelData(null)
              setParcelApiData(null)
              setLoadScreen(false)
            }
          })

      });
  }, [parcel]);

  return (
    <section className={`m-1`}>
      {parcelData && parcelApiData ? (
        <>
            <table className="bg-det-gray mb-1" style={{ position: 'sticky', top: 0}}>
              <thead>
                <tr className="">
                  <td>Parcel ID: {parcelData.attributes.parcel_number}</td>
                  <td>
                    Address: <b>{parcelData.attributes.address}</b>
                  </td>
                </tr>
              </thead>
            </table>
          <DetailsTable parcelData={parcelData.attributes} parcelApiData={parcelApiData} mobile={mobile} />
        </>
      ) : (
        <>
        <div className="p-2 text-lg">
          We couldn't find information for this parcel: {parcel}
        </div>
        {children}
        </>
      )}
    </section>
  );
};

export default Details;
