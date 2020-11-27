import { faExchangeAlt, faMapMarked } from "@fortawesome/free-solid-svg-icons";
import mapboxgl from "mapbox-gl";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import mapStyle from '../style.json'
import satMapStyle from '../satstyle.json'

import { MapTitle, MapTitleSection } from "./MapHeader";

const Map = ({ parcel, setParcel, coords, width, height, children, svCoords, svBearing, showSv, showSatellite }) => {
  const [theMap, setTheMap] = useState(null);
  let history = useHistory();

  let [xMin, yMin, xMax, yMax] = [-83.237803,42.355192,-82.910451,42.45023];
  let xRandomOffset = (xMax - xMin) * Math.random()
  let yRandomOffset = (yMax - yMin) * Math.random()
  let xRandomCenter = xMin + xRandomOffset
  let yRandomCenter = yMin + yRandomOffset

  useEffect(() => {
    var map = new mapboxgl.Map({
      container: "map", // container id
      style: mapStyle, // stylesheet location
      center: coords ? [coords.y, coords.x] : [xRandomCenter, yRandomCenter], // starting position [lng, lat]
      zoom: 16.25, // starting zoom
    });

    map.resize();

    map.on("load", () => {
      setTheMap(map);
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

    map.on('style.load', () => {
      map.setFilter("parcels-highlight", ["==", "parcelno", parcel ? parcel : ""]);
      map.loadImage("https://raw.githubusercontent.com/encharm/Font-Awesome-SVG-PNG/master/black/png/22/video-camera.png", (error, image) => {
        if (error) throw error;
        map.addImage("video", image);
        map.setLayoutProperty("mapillary-location", "icon-image", "video");
      });    
    })
  }, []);

  useEffect(() => {
    if(theMap && showSatellite) {
      theMap.setStyle(satMapStyle)
    }
    if(theMap && !showSatellite) {
      theMap.setStyle(mapStyle)
    };
  }, [showSatellite])

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
    if(theMap && showSv) {
      theMap.setLayoutProperty("mapillary-location", "visibility", "visible")
    }
    if(theMap && !showSv) {
      theMap.setLayoutProperty("mapillary-location", "visibility", "none")
    }
  }, [showSv])

  useEffect(() => {
    console.log(svCoords, svBearing);
    theMap && showSv &&
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
    if(theMap && !showSv){
      theMap.getSource("mapillary").setData({
        type: "FeatureCollection", features: []
      })
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
