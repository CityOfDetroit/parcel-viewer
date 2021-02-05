import { faExchangeAlt, faMapMarked } from "@fortawesome/free-solid-svg-icons";
import mapboxgl from "mapbox-gl";
import 'mapbox-gl/dist/mapbox-gl.css';
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import mapStyle from '../style.json'
import satMapStyle from '../satstyle.json'
import videoIcon from '../img/video.png'

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
      style: showSatellite ? satMapStyle : mapStyle, // stylesheet location
      center: coords ? [coords.y, coords.x] : [xRandomCenter, yRandomCenter], // starting position [lng, lat]
      zoom: 16.25, // starting zoom
    });

    map.addControl(
      new mapboxgl.NavigationControl({
        showCompass: false
      }),
      "bottom-left"
    );

    // Add geolocate control to the map.
map.addControl(
  new mapboxgl.GeolocateControl({
  positionOptions: {
  enableHighAccuracy: true
  },
  trackUserLocation: true
  }), 'bottom-left'
  );
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

      map.addLayer({
        id: "zoning",
        type: "line",
        source: "zoning",
        "source-layer": "Zoning",
        layout: { visibility: "visible" },
        paint: {
          "line-color": [
            'match',
            ['get', 'ZONING_REV'],
            "B1","#F1948A",
            "B2","#EC7063",
            "B3","#E74C3C",
            "B4","#A93226",
            "B5","#922B21",
            "B6","#7B241C",
            "M1","#EBDEF0",
            "M2","#C39BD3",
            "M3","#9B59B6",
            "M4","#7D3C98",
            "M5","#4A235A",
            "P1","#CCD1D1",
            "PC","#884EA0",
            "PCA","#2471A3",
            "PD","#3498DB",
            "PR","#1E8449",
            "SD1","#D4E6F1",
            "SD2","#7FB3D5",
            "SD3","#D7BDE2",
            "SD4","#45B39D",
            "SD5","#ff8f00",
            "TM","#A2D9CE",
            "W1","#82E0AA",
            "R1","#FCF3CF",
            "R2","#F9E79F",
            "R3","#F4D03F",
            "R4","#F1C40F",
            "R5","#D4AC0D",
            "R6","#B7950B", '#ccc'
          ],
          "line-width": 3
        }
      });


    });

    

    map.on('style.load', () => {
      map.loadImage(videoIcon, (error, image) => {
        if (error) throw error;
        map.addImage("video", image);
        map.setFilter("parcels-highlight", ["==", "parcelno", parcel ? parcel : ""]);
        svCoords && map.getSource("mapillary").setData({
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
