/* global window */
import React, {Component} from 'react';

import MapGL from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import {defaultMapStyle} from './map-style.js';
import _ from 'lodash';

import centroid from '@turf/centroid';

import ParcelDetails from './components/ParcelDetails';
import AddressSearch from './components/AddressSearch';
import Header from './components/Header';
import LayerSwitch from './components/LayerSwitch';

const MAPBOX_TOKEN = 'pk.eyJ1IjoiY2l0eW9mZGV0cm9pdCIsImEiOiJjaXZvOWhnM3QwMTQzMnRtdWhyYnk5dTFyIn0.FZMFi0-hvA60KYnI-KivWg'; // Set your mapbox token here

export default class App extends Component {

  constructor(props) {
    super(props)
    console.log(props)
    this.state = {
      viewport: {
        latitude: 42.331,
        longitude: -83.0457,
        zoom: 16,
        bearing: 0,
        pitch: 0,
        width: window.innerWidth,
        height: window.innerHeight
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
      selectedParcel: this.props.match.params.name || null,
      selectedParcelDetails: null,
      mapStyle: defaultMapStyle
    }

    this.onSearchSelect = this.onSearchSelect.bind(this)
    this._onZoningChange = this._onZoningChange.bind(this)
    this._onRoadsChange = this._onRoadsChange.bind(this)
  }

  fetchData(parcelno) {
    fetch(`https://data.detroitmi.gov/resource/snut-x2sy.json?parcelnum=${this.state.selectedParcel}`)
    .then(response => response.json())
    .then(d => {
      this.setState({
        selectedParcelDetails: d[0],
      })
      this.highlightParcel(this.state.selectedParcel)
    })
    .catch(e => console.log(e))
  }

  onSearchSelect(value) {
    fetch(`https://gis.detroitmi.gov/arcgis/rest/services/DoIT/AddressPointGeocoder/GeocodeServer/findAddressCandidates?Single+Line+Input=${value}&outSR=4326&outFields=*&f=pjson`)
    .then(r => r.json())
    .then(d => {
      console.log(d)
      this.setState({
        selectedParcel: d.candidates[0].attributes['User_fld'],
        viewport: {
          ...this.state.viewport,
          latitude: d.candidates[0].location.y,
          longitude: d.candidates[0].location.x,
        }
      })
      this.highlightParcel(d.candidates[0].attributes['User_fld'])
      this.props.history.push(`/${d.candidates[0].attributes['User_fld']}`)
    })
  }

  highlightParcel(parcelno) {
    let style = this.state.mapStyle
    let layerIndex = style.toJS().layers.findIndex(lyr => lyr.id === 'parcels-highlight')
    style = style.setIn(['layers', layerIndex, 'filter', 2], parcelno)
    this.setState({
      mapStyle: style,
    })
  }

  componentDidMount() {
    window.addEventListener('resize', this._resize);
    this._resize();
    if(this.props.match.params.name) {
      this.fetchData(this.state.selectedParcel)
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
    this.fetchData(nextProps.match.params.name)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this._resize);
  }

  _resize = () => {
    this.setState({
      viewport: {
        ...this.state.viewport,
        width: ( window.outerWidth * 7) / 10,
        height: window.innerHeight
      }
    });
  };

  _onClick = (event) => {
    if(event.features.length > 0) {
      const center = centroid(event.features[0]).geometry.coordinates
      this.highlightParcel(event.features[0].properties.parcelno)
      this.props.history.push(`/${event.features[0].properties.parcelno}`)
      this.setState({
        selectedParcel: event.features[0].properties.parcelno,
        viewport: {
          ...this.state.viewport,
          latitude: center[1],
          longitude: center[0]
        }
      })
    }
  } 

  _onViewportChange = viewport => this.setState({viewport});

  _onZoningChange = (checked) => {
    let style = this.state.mapStyle
    let layerIndex = style.toJS().layers.findIndex(lyr => lyr.id === 'zoning')
    style = style.setIn(['layers', layerIndex, 'layout', 'visibility'], checked ? 'visible' : 'none')     
    this.setState({
      mapStyle: style
    })
  }

  _onRoadsChange = (checked) => {
    let style = this.state.mapStyle
    _.forEach(style.toJS().layers, (l, i) => {
      (console.log(l, i))
      if(l['source-layer'] === 'road') {
        style = style.setIn(['layers', i, 'layout', 'visibility'], checked ? 'visible' : 'none')
      }
    })
    this.setState({
      mapStyle: style
    })
  }

  _onSatelliteChange = (checked) => {
    let style = this.state.mapStyle
    let layerIndex = style.toJS().layers.findIndex(lyr => lyr.id === 'mapbox-mapbox-satellite')
    style = style.setIn(['layers', layerIndex, 'layout', 'visibility'], checked ? 'visible' : 'none')     
    this.setState({
      mapStyle: style
    })
  }

  render() {

    const {viewport, settings, mapStyle} = this.state;

    return (
      <div className="App">
        <div className="header">
          <Header />
          <AddressSearch onSelect={this.onSearchSelect} />
          <LayerSwitch name='zoning' onChange={this._onZoningChange}/>
          <LayerSwitch name='satellite' onChange={this._onSatelliteChange}/>
          <LayerSwitch name='roads' onChange={this._onRoadsChange}/>
        </div>
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
        <div className="details bg-white">
            {this.state.selectedParcel ? 
              <ParcelDetails parcel={this.state.selectedParcel} /> : `Click a parcel.`}
        </div>
      </div>
    );
  }

}