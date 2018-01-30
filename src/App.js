/* global window */
import React, {Component} from 'react';
import {render} from 'react-dom';

import MapGL, {Marker} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import {Checkbox, CheckboxGroup} from 'react-checkbox-group';
import _ from 'lodash';

import Zones from './data/zones.js'
import Layers from './data/layers.js'
import {defaultMapStyle, highlightLayerIndex} from './map-style.js';
import MAP_STYLE from './data/style.json';

import ZoningClass from './components/ZoningClass'
import { fromJS, toJS } from 'immutable';

const MAPBOX_TOKEN = 'pk.eyJ1IjoiY2l0eW9mZGV0cm9pdCIsImEiOiJjaXZvOWhnM3QwMTQzMnRtdWhyYnk5dTFyIn0.FZMFi0-hvA60KYnI-KivWg'; // Set your mapbox token here

export default class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      viewport: {
        latitude: 42.331,
        longitude: -83.0457,
        zoom: 11,
        bearing: 0,
        pitch: 0,
        width: 500,
        height: 500
      },
      settings: {
        dragPan: true,
        scrollZoom: true,
        touchZoom: true,
        touchRotate: true,
        keyboard: true,
        doubleClickZoom: true,
        minZoom: 11,
        maxZoom: 19,
        minPitch: 0,
        maxPitch: 0
      },
      zones: [],
      layers: [],
      selectedFeature: null,
      mapStyle: defaultMapStyle
    }

    this._zonesDidChange = this._zonesDidChange.bind(this)
  }


  componentDidMount() {
    window.addEventListener('resize', this._resize);
    this._resize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this._resize);
  }

  _zonesDidChange = newZones => {
    const style = this.state.mapStyle
    this.setState({
      zones: newZones,
      mapStyle: style.setIn(['layers', highlightLayerIndex, 'filter'], ["in", "zoning_rev"].concat(newZones))
    });
  }

  _layersDidChange = newLayers => {
    let style = this.state.mapStyle
    _.forEach(Object.keys(Layers), l => {
      let layerIndex = style.toJS().layers.findIndex(lyr => lyr.id === l)
      let shown = newLayers.indexOf(l) > -1
      style = style.setIn(['layers', layerIndex, 'layout', 'visibility'], shown ? 'visible' : 'none')
    })
    this.setState({
      layers: newLayers,
      mapStyle: style
    });
  }

  _resize = () => {
    this.setState({
      viewport: {
        ...this.state.viewport,
        width: this.props.width || window.innerWidth,
        height: this.props.height || window.innerHeight
      }
    });
  };

  _onClick = (event) => {
    console.log(event.features)
    if(event.features.length > 0) {
      this.setState({
        selectedFeature: event.features[0]
      })
    }
  } 

  _onViewportChange = viewport => this.setState({viewport});

  render() {

    const {viewport, settings, mapStyle} = this.state;

    return (
      <div className="App">
        <div className="map">
          <MapGL
            {...viewport}
            {...settings}
            mapStyle={mapStyle}
            onViewportChange={this._onViewportChange}
            onClick={this._onClick}
            mapboxApiAccessToken={MAPBOX_TOKEN} >
          </MapGL>
        </div>
        <div className="zones bg-white">
          <CheckboxGroup name="zones" value={this.state.zones} onChange={this._zonesDidChange} >
            {Object.keys(Zones).map(z => 
              <div key={z}>
                <Checkbox className="dn" value={z} id={z}/>
                <label for={z}>
                  <ZoningClass zone={z} selected={this.state.zones.indexOf(z) > -1}/>
                </label>
              </div>
            )}
          </CheckboxGroup>
        </div>
        <div className="layers bg-white">
          <CheckboxGroup name="layers" value={this.state.layers} onChange={this._layersDidChange} >
            {Object.keys(Layers).map(l => 
              <div key={l}>
                <Checkbox className="" value={l} id={l}/>
                <label for={l}>
                  {l}
                </label>
              </div>
            )}
          </CheckboxGroup>
        </div>
        <div className="details bg-white">
            {this.state.selectedFeature ? this.state.selectedFeature.id : `Click for a meaningless number`}
        </div>
      </div>
    );
  }

}