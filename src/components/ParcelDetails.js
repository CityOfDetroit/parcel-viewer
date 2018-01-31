import React, { Component } from 'react';
import ParcelDetailTable from './ParcelDetailTable'

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
      this.setState({ 
        parcel: d[0],
        fetchedData: true
      })
    })
    .catch(e => console.log(e))
  }

  componentDidMount() {
    this.fetchData(this.props.parcel)
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
    if(this.props.parcel !== nextProps.parcel) {
      this.fetchData(nextProps.parcel)
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