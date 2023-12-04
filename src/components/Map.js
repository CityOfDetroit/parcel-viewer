import { faExchangeAlt, faMapMarked } from "@fortawesome/free-solid-svg-icons";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import mapStyle from "../style.json";
import satMapStyle from "../satstyle.json";
import videoIcon from "../img/video.png";

import { MapTitle, MapTitleSection } from "./MapHeader";

const Map = ({
  parcel,
  setParcel,
  coords,
  width,
  height,
  children,
  svCoords,
  svBearing,
  showSv,
  showSatellite,
}) => {
  const [theMap, setTheMap] = useState(null);
  let history = useHistory();

  let [xMin, yMin, xMax, yMax] = [-83.237803, 42.355192, -82.910451, 42.45023];
  let xCenter = (xMin + xMax) / 2;
  let yCenter = (yMin + yMax) / 2;

  useEffect(() => {
    var map = new mapboxgl.Map({
      container: "map", // container id
      style: showSatellite ? satMapStyle : mapStyle, // stylesheet location
      center: coords ? [coords.y, coords.x] : [xCenter, yCenter], // starting position [lng, lat]
      zoom: 11, // starting zoom
    });

    map.addControl(
      new mapboxgl.NavigationControl({
        showCompass: false,
      }),
      "bottom-left"
    );

    // Add geolocate control to the map.
    map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
      }),
      "bottom-left"
    );
    map.resize();

    map.on("load", () => {
      setTheMap(map);
      map.on("click", "parcels-fill", function (e) {
        let results = map.queryRenderedFeatures(e.point, {
          layers: ["parcels-fill"],
        });
        console.log(results);

        // Subsequent clicks on the same shape cycle between overlapping parcels.
        setParcel((currentParcel) => {
          const parcels = results.map((p) => p.properties.parcel_id);
          const currentIndex = parcels.findIndex(
            (candidateParcel) => candidateParcel === currentParcel
          );
          const nextIndex = (currentIndex + 1) % results.length;
          const nextParcel = parcels[nextIndex];

          history.push(`/${nextParcel}/`);
          return nextParcel;
        });

        // setCoords(e.lngLat);
      });
    });

    map.on("style.load", () => {
      map.loadImage(videoIcon, (error, image) => {
        if (error) throw error;
        map.addImage("video", image);
        map.setFilter("parcels-highlight", [
          "==",
          "parcel_id",
          parcel ? parcel : "",
        ]);
        svCoords &&
          map.getSource("mapillary").setData({
            type: "FeatureCollection",
            // we'll make the map data here
            features: [
              {
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: [svCoords.lon, svCoords.lat],
                },
                properties: {
                  bearing: svBearing - 90,
                },
              },
            ],
          });
      });
    });
  }, []);

  useEffect(() => {
    if (theMap && showSatellite) {
      theMap.setStyle(satMapStyle);
    }
    if (theMap && !showSatellite) {
      theMap.setStyle(mapStyle);
    }
  }, [showSatellite]);

  //Highlight active parcel
  useEffect(() => {
    theMap &&
      theMap.setFilter("parcels-highlight", [
        "==",
        "parcel_id",
        parcel ? parcel : "",
      ]);
  }, [parcel, theMap]);

  //Highlight active parcel
  useEffect(() => {
    theMap && coords && theMap.easeTo({center: [coords.x, coords.y], zoom: 17 });
  }, [coords, theMap]);

  useEffect(() => {
    theMap && theMap.resize();
  }, [width, height]);

  useEffect(() => {
    if (theMap && showSv) {
      theMap.setLayoutProperty("mapillary-location", "visibility", "visible");
    }
    if (theMap && !showSv) {
      theMap.setLayoutProperty("mapillary-location", "visibility", "none");
    }
  }, [showSv]);

  useEffect(() => {
    console.log(svCoords, svBearing);
    theMap &&
      showSv &&
      theMap.getSource("mapillary").setData({
        type: "FeatureCollection",
        // we'll make the map data here
        features: [
          {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [svCoords.lon, svCoords.lat],
            },
            properties: {
              bearing: svBearing - 90,
            },
          },
        ],
      });
    if (theMap && !showSv) {
      theMap.getSource("mapillary").setData({
        type: "FeatureCollection",
        features: [],
      });
    }
  }, [svCoords, svBearing]);

  return (
    <section id="map" className={`map-view mx-1 mt-1 rounded`}>
      <MapTitleSection>
        <MapTitle icon={faMapMarked}>Map</MapTitle>
        {children}
      </MapTitleSection>
    </section>
  );
};

export default Map;
