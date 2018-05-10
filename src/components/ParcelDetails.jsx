import React, { Component } from 'react';
import ParcelDetailTable from './ParcelDetailTable'

class ParcelDetails extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.parcel === nextProps.parcel && this.props.parcelDetails === {}) {
      return false
    }
    return true
  }
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