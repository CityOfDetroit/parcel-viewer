import {fromJS} from 'immutable';
import MAP_STYLE from './data/style.json';
import _ from 'lodash';
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
    layout: {"visibility": "visible"},
    paint: {
        "line-color": {
            property: "zoning_rev",
            type: "categorical",
            stops: _.zip(_.keys(Zones), _.map(Zones, 'color'))
            },
        "line-width": {
          stops: [[14,1], [19,15]]
        },
        "line-offset": {
          stops: [[14, 0], [17, -1], [19, -6]]
        }
    }
  }
);

export const highlightLayerIndex =
  MAP_STYLE.layers.findIndex(layer => layer.id === 'zoning');

export const defaultMapStyle = fromJS(MAP_STYLE);