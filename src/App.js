/* global window */
import React, {Component} from 'react';

import MapGL from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import {defaultMapStyle} from './map-style.js';

import ParcelDetails from './components/ParcelDetails';
import AddressSearch from './components/AddressSearch';
import Header from './components/Header';

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
      selectedParcel: this.props.match.params.name || null,
      selectedParcelDetails: null,
      mapStyle: defaultMapStyle
    }
  }

  fetchData(parcelno) {
    fetch(`https://data.detroitmi.gov/resource/snut-x2sy.json?parcelnum=${this.state.selectedParcel}`)
    .then(response => response.json())
    .then(d => {
      this.setState({
        selectedParcelDetails: d[0],
        viewport: { ...this.state.viewport,
          latitude: parseFloat(d[0].latitude, 10),
          longitude: parseFloat(d[0].longitude, 10),
        }
      })
      this.highlightParcel(this.state.selectedParcel)
    })
    .catch(e => console.log(e))
  }

  highlightParcel(parcelno) {
    let style = this.state.mapStyle
    let layerIndex = style.toJS().layers.findIndex(lyr => lyr.id === 'parcels-highlight')
    style = style.setIn(['layers', layerIndex, 'filter', 2], parcelno)
    this.setState({
      mapStyle: style
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
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this._resize);
  }

  _resize = () => {
    this.setState({
      viewport: {
        ...this.state.viewport,
        width: this.props.width || (window.innerWidth * 4 / 6),
        height: this.props.height || window.innerHeight - 75
      }
    });
  };

  _onClick = (event) => {
    if(event.features.length > 0) {
      console.log(event.features[0])
      this.highlightParcel(event.features[0].properties.parcelno)
      this.props.history.push(`/${event.features[0].properties.parcelno}`)
      this.setState({
        selectedParcel: event.features[0].properties.parcelno
      })
    }
  } 

  _onViewportChange = viewport => this.setState({viewport});

  render() {

    const {viewport, settings, mapStyle} = this.state;

    return (
      <div className="App">
        <Header />
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
        <AddressSearch />
        <div className="details bg-white">
            {this.state.selectedParcel ? 
              <ParcelDetails parcel={this.state.selectedParcel} /> : `Click a parcel.`}
        </div>
      </div>
    );
  }

}