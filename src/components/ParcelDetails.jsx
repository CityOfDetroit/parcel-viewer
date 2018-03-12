import React, { Component } from 'react';
import ParcelDetailTable from './ParcelDetailTable'
import Zones from '../data/zones';

class ParcelDetails extends Component {

  render() {
    return (
      <div className="pa2">
        <span className="db f5 fw7 bb">Parcel number: {this.props.parcel}</span>
        {this.props.parcelDetails !== {} ? <ParcelDetailTable parcel={this.props.parcelDetails} /> : null}
      </div>
    )
  }
}

export default ParcelDetails;