/* global window */
import React, {Component} from 'react';

import MapGL, { FlyToInterpolator } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import {defaultMapStyle} from './map-style.js';
import _ from 'lodash';
import * as d3 from 'd3';

import centroid from '@turf/centroid';

import ParcelDetails from './components/ParcelDetails';
import AddressSearch from './components/AddressSearch';
import Header from './components/Header';
import Footer from './components/Footer';
import LayerSwitch from './components/LayerSwitch';
import ZoningClass from './components/ZoningClass'
import Zones from './data/zones.js'

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
      mapStyle: defaultMapStyle,
      showZoningLegend: false,
      didAutolocate: false,
    }

    this.onSearchSelect = this.onSearchSelect.bind(this)
    this._onZoningChange = this._onZoningChange.bind(this)
  }

  fetchData(parcelno) {
    fetch(`https://data.detroitmi.gov/resource/snut-x2sy.json?parcelnum=${this.state.selectedParcel}`)
    .then(response => response.json())
    .then(d => {
      if(this.props.match.params.name && !this.didAutolocate) {
        this.setState({
          selectedParcelDetails: d[0],
          didAutolocate: true,
          viewport: {
            ...this.state.viewport,
            latitude: d[0].location.coordinates[1],
            longitude: d[0].location.coordinates[0],
          }
        })
      }
      else {
        this.setState({
          selectedParcelDetails: d[0]
        })
      }

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
      })
      this._goToParcel([d.candidates[0].location.x, d.candidates[0].location.y])
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

  componentWillUnmount() {
    window.removeEventListener('resize', this._resize);
  }

  _resize = () => {
    if (window.innerWidth > 650) {
      this.setState({
        viewport: {
          ...this.state.viewport,
          width: ( window.outerWidth * 7) / 10,
          height: window.innerHeight
        }
      });
    }
    else {
      this.setState({
        viewport: {
          ...this.state.viewport,
          width: window.innerWidth,
          height: window.innerHeight * 3 / 10 
        }
      });
    }
  };

  _onClick = (event) => {
    if(event.features.length > 0) {
      const center = centroid(event.features[0]).geometry.coordinates
      this.highlightParcel(event.features[0].properties.parcelno)
      this.props.history.push(`/${event.features[0].properties.parcelno}/`)
      this.setState({
        selectedParcel: event.features[0].properties.parcelno,
      })
      this._goToParcel(center)
    }
  } 

  _onViewportChange = viewport => this.setState({viewport});

  _onZoningChange = (checked) => {
    let style = this.state.mapStyle
    let layerIndex = style.toJS().layers.findIndex(lyr => lyr.id === 'zoning')
    style = style.setIn(['layers', layerIndex, 'layout', 'visibility'], checked ? 'visible' : 'none')     
    this.setState({
      mapStyle: style,
      showZoningLegend: checked ? true : false
    })
  }

  _onSatelliteChange = (checked) => {
    let style = this.state.mapStyle
    let layerIndex = style.toJS().layers.findIndex(lyr => lyr.id === 'satellite')
    style = style.setIn(['layers', layerIndex, 'layout', 'visibility'], checked ? 'visible' : 'none')  
    _.forEach(style.toJS().layers, (l, i) => {
      if(l['source-layer'] === 'road') {
        style = style.setIn(['layers', i, 'layout', 'visibility'], checked ? 'none' : 'visible')
      }
    })   
    this.setState({
      mapStyle: style
    })
  }

  _goToParcel = (coords) => {
    const viewport = {
      ...this.state.viewport,
      longitude: coords[0],
      latitude: coords[1],
      transitionDuration: 250,
      transitionInterpolator: new FlyToInterpolator(),
      transitionEasing: d3.easeCubic
  };
    this.setState({viewport})
  }

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
        <div className="sidebar">
          <Header />
          <AddressSearch onSelect={this.onSearchSelect} />
          <div className="pa2">
            <span className="db f5 fw7 bb">Map layers</span>
            <div className="pv2" style={{display: 'flex', flexDirection: 'row'}}>
              <LayerSwitch name='zoning' defaultChecked={false} onChange={this._onZoningChange} />
              <LayerSwitch name='satellite' defaultChecked onChange={this._onSatelliteChange} />
            </div>
          </div>
          {this.state.selectedParcel ? 
              <ParcelDetails parcel={this.state.selectedParcel} /> : `Click a parcel.`}
            {this.state.showZoningLegend ? (
              <div className="pa2">
              <span className="db f5 fw7 bb">Zoning classifications</span>
              <div className="pa2" style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'stretch' }}>
              {Object.keys(Zones).map(z => 
                <ZoningClass zone={z}/>           
              )}</div></div>) : null}
          <Footer />
        </div>
      </div>
    );
  }

}