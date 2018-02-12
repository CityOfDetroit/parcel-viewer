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
  MAP_STYLE.layers.findIndex(layer => layer.id === 'landcover_scrub'), 0,
  // Highlighted county polygons
  {
    id: 'zoning',
    type: 'fill',
    source: 'zoning',
    'source-layer': 'zoninggeojson',
    layout: {"visibility": "visible"},
    paint: {
        "fill-color": {
            property: "zoning_rev",
            type: "categorical",
            stops: _.zip(_.keys(Zones), _.map(Zones, 'color'))
            },
            "fill-opacity": {
            stops: [[10, 0.5], [15, 0.7], [16, 0.8], [18, 0.12]]
            }
    }
  }
);

export const highlightLayerIndex =
  MAP_STYLE.layers.findIndex(layer => layer.id === 'zoning');

export const defaultMapStyle = fromJS(MAP_STYLE);