import React from 'react'

const ParcelDetailTable = ({ parcel }) => (
  <div>
    <span className="db f7 fw7 bb">Address</span>
    <span className="db pb1 f4">{parcel.address}</span>
    <span className="db f7 fw7 bb">Owner</span>
    <span className="db pb1 f4">{parcel.owner}</span>
    <span className="db f7 fw7 bb">Last Sale Price</span>
    <span className="db pb1 f4">{parcel.last_sale_price}</span>
    <span className="db f7 fw7 bb">Dimensions</span>
    <span className="db pb1 f4">{parcel.frontage} x {parcel.depth}</span>
  </div>
)

export default ParcelDetailTable