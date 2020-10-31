import { faCalendar, faCalendarAlt, faStreetView } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import bearing from "@turf/bearing";
import * as Mapillary from "mapillary-js";
import moment from "moment";
import React, { useEffect, useState } from "react";

import { MapTitle, MapTitleSection } from "./MapHeader";

let clientid = "bmZxVGc0ODVBVXhZVk5FTDdyeHlhZzowM2EyODU0Njc4OWY3ZGNi";

/**
 * Wrap a value on the interval [min, max].
 */
function wrap(value, min, max) {
  var interval = max - min;

  while (value > max || value < min) {
    if (value > max) {
      value = value - interval;
    } else if (value < min) {
      value = value + interval;
    }
  }

  return value;
}

/**
 * Convert a desired bearing to a basic X image coordinate for
 * a specific node bearing.
 *
 * Works only for a full 360 panorama.
 */
function bearingToBasic(desiredBearing, nodeBearing) {
  // 1. Take difference of desired bearing and node bearing in degrees.
  // 2. Scale to basic coordinates.
  // 3. Add 0.5 because node bearing corresponds to the center
  //    of the image. See
  //    https://mapillary.github.io/mapillary-js/classes/viewer.html
  //    for explanation of the basic coordinate system of an image.
  var basic = (desiredBearing - nodeBearing) / 360 + 0.5;

  // Wrap to a valid basic coordinate (on the [0, 1] interval).
  // Needed when difference between desired bearing and node
  // bearing is more than 180 degrees.
  return wrap(basic, 0, 1);
}

/**
 * Function to set the mapillary viewer's center by computing bearing
 */
function setBearing(node, mly, start, end) {
  if (!node.fullPano) {
    // We are only interested in setting the bearing for full 360 panoramas.
    return;
  }
  var nodeBearing = node.computedCA; // Computed node compass angle (equivalent
  // to bearing) is used by mjs when placing
  // the node in 3D space.

  // compute this with @turf/bearing
  var desiredBearing = bearing(start, end); // Your desired bearing.

  var basicX = bearingToBasic(desiredBearing, nodeBearing);
  var basicY = 0.6; // tilt slight down

  var center = [basicX, basicY];

  mly.setCenter(center);
}

/**
 * Promise-returning function to fetch a new Mapillary imageKey based on some coordinates
 */
const fetchImageKey = (coords) => {
  let lnglat;
  if (coords.lng && coords.lat) {
    lnglat = `${coords.lng},${coords.lat}`;
  }
  if (coords.x && coords.y) {
    lnglat = `${coords.x},${coords.y}`;
  }
  let url = `https://a.mapillary.com/v3/images?client_id=${clientid}&closeto=${lnglat}&radius=80&usernames=codgis&start_time=2018-07-01`;
  return fetch(url).then((r) => r.json());
};

let markerStyle = {
  ballColor: "white",
  ballOpacity: 0.5,
  color: "#feb70d",
  opacity: 0.55,
  interactive: false,
  radius: 2,
};

const StreetView = ({ coords, width, height, setSvBearing, setSvCoords, children }) => {
  // local state to store the mapillary viewer
  const [mapillary, setMapillary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentCoords, setCurrentCoords] = useState(null);
  const [currentKey, setCurrentKey] = useState(null);
  const [imageKeys, setImageKeys] = useState(null);

  // show full streetview on click of streetview button
  useEffect(() => {
    let mapillaryView = new Mapillary.Viewer("mly", clientid, null, {
      component: {
        cover: true,
        marker: true,
        sequence: false,
        cache: true,
        attribution: false,
        // direction: true
      },
    });

    setMapillary(mapillaryView);

    mapillaryView.on("nodechanged", (n) => {
      console.log(n.latLon);
      setSvCoords(n.latLon);
    });

    mapillaryView.on("bearingchanged", (b) => {
      console.log(b);
      setSvBearing(b);
    });

    if (coords !== currentCoords) {
      setCurrentCoords(coords);
      fetchImageKey(coords).then((d) => {
        let sequences = [];
        d.features.forEach((ik) => {
          if (sequences.map((s) => s.properties.captured_at.slice(0, 10)).indexOf(ik.properties.captured_at.slice(0, 10)) === -1) {
            sequences.push(ik);
          }
        });
        let sorted = sequences.sort((a, b) => moment(a.properties.captured_at) - moment(b.properties.captured_at));
        setImageKeys(sorted);
        setCurrentKey(sorted[sorted.length - 1]);
      });
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    mapillary &&
      currentKey &&
      mapillary.moveToKey(currentKey.properties.key).then((node) => {
        setBearing(node, mapillary, currentKey.geometry.coordinates, [coords.lng || coords.x, coords.lat || coords.y]);
        setLoading(false);
      });
  }, [currentKey]);

  useEffect(() => {
    if (mapillary) {
      setLoading(true);
      setImageKeys(null);
      let defaultMarker = new Mapillary.MarkerComponent.SimpleMarker("default-id", { lat: coords.y, lon: coords.x }, markerStyle);
      let markerComponent = mapillary.getComponent("marker");
      markerComponent.add([defaultMarker]);
      fetchImageKey(coords).then((d) => {
        let sequences = [];
        d.features.forEach((ik) => {
          if (sequences.map((s) => s.properties.captured_at.slice(0, 10)).indexOf(ik.properties.captured_at.slice(0, 10)) === -1) {
            sequences.push(ik);
          }
        });
        let sorted = sequences.sort((a, b) => moment(a.properties.captured_at) - moment(b.properties.captured_at));
        setImageKeys(sorted);
        setCurrentKey(sorted[sorted.length - 1]);
      });
    }
  }, [coords]);

  useEffect(() => {
    if (mapillary) {
      mapillary.resize();
    }
  }, [width, height]);

  return (
    <section id="mly" className="street-view mx-1 mt-1 rounded">
      <MapTitleSection>
        <MapTitle icon={faStreetView}>{loading ? `Loading imagery...` : `Street view`}</MapTitle>
        {imageKeys && currentKey && (
          <div className="flex items-center">
            <FontAwesomeIcon icon={faCalendarAlt} className="text-md mr-2" />
            <select
              className="block appearance-none text-xs mr-3 px-2 py-1 bg-det-gray border border-gray-200 text-gray-700 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              value={moment(currentKey.properties.captured_at).format("ll")}
              onChange={(e) => {
                setCurrentKey(imageKeys.filter((s) => moment(s.properties.captured_at).format("ll") === e.target.value)[0]);
              }}
            >
              {imageKeys.map((s, i) => (
                <option key={s.properties.key}>{moment(s.properties.captured_at).format("ll")}</option>
              ))}
            </select>
            {children}
          </div>
        )}
      </MapTitleSection>
    </section>
  );
};

export default StreetView;
