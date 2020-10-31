import { faExchangeAlt, faMapMarked } from "@fortawesome/free-solid-svg-icons";
import mapboxgl from "mapbox-gl";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import mapStyle from '../style.json'

import { MapTitle, MapTitleSection } from "./MapHeader";

const addLayers = (map) => {

  // add a new layer for the street-view video camera
  map.addLayer({
    id: "mapillary-location",
    type: "symbol",
    source: {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: [],
      },
    },
    layout: {
      "icon-rotate": ["get", "bearing"],
      "icon-rotation-alignment": "map",
    },
  });

  map.loadImage("https://raw.githubusercontent.com/encharm/Font-Awesome-SVG-PNG/master/black/png/22/video-camera.png", (error, image) => {
    if (error) throw error;
    map.addImage("video", image);
    map.setLayoutProperty("mapillary-location", "icon-image", "video");
  });

  map.addLayer({
    id: "parcels",
    type: "line",
    source: "parcels",
    "source-layer": "parcels",
    minzoom: 11,
    layout: {
      visibility: "visible",
    },
    paint: {
      "line-color": {
        stops: [
          [14, "#222"],
          [17, "#333"],
          [17.1, "#444"],
          [18, "#333"],
        ],
      },
      "line-width": {
        base: 1,
        stops: [
          [14, 0.1],
          [17, 1],
          [19, 4],
        ],
      },
      "line-opacity": {
        base: 1,
        stops: [
          [14, 0],
          [14.1, 0.5],
          [22, 1],
        ],
      },
    },
  });

  map.addLayer({
    id: "parcels-highlight",
    type: "line",
    source: "parcels",
    "source-layer": "parcels",
    minzoom: 15,
    filter: ["==", "parcelno", ""],
    layout: {
      visibility: "visible",
    },
    paint: {
      "line-color": "#feb70d",
      "line-width": {
        base: 1,
        stops: [
          [14, 2],
          [15, 3],
          [22, 10],
        ],
      },
      "line-opacity": {
        base: 1,
        stops: [
          [14, 0],
          [14.1, 0.1],
          [14.5, 1],
          [22, 1],
        ],
      },
    },
  });

  map.addLayer({
    id: "parcels-fill",
    type: "fill",
    source: "parcels",
    "source-layer": "parcels",
    interactive: true,
    minzoom: 12,
    layout: {
      visibility: "visible",
    },
    paint: {
      "fill-color": "rgba(0,0,0,0)",
    },
  });
};

const Map = ({ parcel, setParcel, coords, width, height, children, svCoords, svBearing }) => {
  const [theMap, setTheMap] = useState(null);
  let history = useHistory();

  useEffect(() => {
    var map = new mapboxgl.Map({
      container: "map", // container id
      style: mapStyle, // stylesheet location
      center: coords ? [coords.y, coords.x] : [-83.0457, 42.331], // starting position [lng, lat]
      zoom: 17.5, // starting zoom
    });

    map.resize();

    map.on("load", () => {
      setTheMap(map);

      addLayers(map);

      map.on("click", "parcels-fill", function (e) {
        let parcel = map.queryRenderedFeatures(e.point, {
          layers: ["parcels-fill"],
        });
        console.log(parcel)
        setParcel(parcel[0].properties.parcelno);
        history.push(`/${parcel[0].properties.parcelno}/`);
        // setCoords(e.lngLat);
      });
    });
  }, []);

  //Highlight active parcel
  useEffect(() => {
    theMap && theMap.setFilter("parcels-highlight", ["==", "parcelno", parcel ? parcel : ""]);
  }, [parcel, theMap]);

  //Highlight active parcel
  useEffect(() => {
    theMap && coords && theMap.panTo([coords.x, coords.y]);
  }, [coords, theMap]);

  useEffect(() => {
    theMap && theMap.resize();
  }, [width, height]);

  useEffect(() => {
    console.log(svCoords, svBearing);
    theMap &&
      theMap.getSource("mapillary-location").setData({
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
