import React, { Component } from 'react';
import ParcelDetailTable from './ParcelDetailTable'
import Zones from '../data/zones';

class ParcelDetails extends Component {
  constructor(props) {
    super(props)

    this.state = {
      parcel: {},
      fetchedData: false
    }
  }

  fetchData(parcelno) {
    fetch(`https://data.detroitmi.gov/resource/snut-x2sy.json?parcelnum=${parcelno}`)
    .then(response => response.json())
    .then(d => {
      this.lookupZone(d[0], Zones);
      this.setState({ 
        parcel: d[0],
        fetchedData: true,
      })
    })
    .catch(e => console.log(e))
  }

  lookupZone(parcel, zones) {
    let z = parcel.zoning

    // add a new key/value to parcel
    parcel.zoning_name = `${parcel.zoning}: ${zones[z].name}`
    return parcel
  }

  componentDidMount() {
    this.fetchData(this.props.parcel)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.parcel !== nextProps.parcel) {
      this.fetchData(nextProps.parcel)
    }
  }

  render() {
    return (
      <div className="pa2">
        <span className="db f5 fw7 bb">Parcel number: {this.props.parcel}</span>
        { this.state.fetchedData ? <ParcelDetailTable parcel={this.state.parcel} /> : `` }
      </div>
    )
  }
}

export default ParcelDetails;