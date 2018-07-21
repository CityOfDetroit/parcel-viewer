import {fromJS} from 'immutable';
import MAP_STYLE from './data/style.json';
import zip from 'lodash/zip';
import keys from 'lodash/keys';
import map from 'lodash/map';
import Zones from './data/zones.js'

// Add the vector tile source for counties
Object.assign(MAP_STYLE.sources, {
  zoning: {
    type: 'vector',
    url: 'mapbox://cityofdetroit.5kwrqmxx'
  }
});

// Insert custom layers before city labels
MAP_STYLE.layers.splice(
  MAP_STYLE.layers.findIndex(layer => layer.id === 'parcels'), 0,
  // Highlighted county polygons
  {
    id: 'zoning',
    type: 'line',
    source: 'zoning',
    'source-layer': 'zoninggeojson',
    layout: {
      "visibility": "none", 
      "line-cap": "round",
      "line-join": "round"
    },
    paint: {
        "line-color": {
            property: "zoning_rev",
            type: "categorical",
            stops: zip(keys(Zones), map(Zones, 'color'))
            },
        "line-width": {
          stops: [[14,1], [19,15]]
        },
        "line-offset": {
          stops: [[14, 0], [17, -.5], [19, -6]]
        }
    }
  }
);

export const highlightLayerIndex =
  MAP_STYLE.layers.findIndex(layer => layer.id === 'zoning');

export const defaultMapStyle = fromJS(MAP_STYLE);