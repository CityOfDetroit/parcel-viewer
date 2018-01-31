import React, { Component } from 'react';
import ParcelDetailTable from './ParcelDetailTable'

class ParcelDetails extends Component {

  constructor(props) {
    super(props)
    fetch(`https://data.detroitmi.gov/resource/snut-x2sy.json?parcelnum=${this.props.parcel}`)
    .then(response => response.json())
    .then(d => {
      this.setState({ 
        parcel: d[0] 
      })
    })
    .catch(e => console.log(e))
    this.state = {
      parcel: {},
    }
  }

  render() {
    return (
      <div className="pa2">
        <span className="db f7 fw7 bb">Parcel ID</span>
        <span className="db pb1 f4">{this.props.parcel}</span>
        <ParcelDetailTable parcel={this.state.parcel} />
      </div>
    )
  }
}

export default ParcelDetails;