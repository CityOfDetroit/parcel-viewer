import React from 'react'

import moment from 'moment'

import { List } from 'antd'

class ParcelDetailTable extends React.Component {

  render() {
    const parcel = this.props.parcel

    const data = {
      'Address': parcel.address,
      'Owner': parcel.owner1,
      'Owner Address': `${parcel.owner_street}, ${parcel.owner_city}, ${parcel.owner_state}`,
      'Last Sale Date': parcel.last_sale_date || `No record`,
      'Last Sale Price': `$${parcel.last_sale_price}`,
      'Taxable Value': `$${parcel.taxable_value}`,
      'Dimensions': `${parcel.depth} x ${parcel.frontage}`,
      'Legal Description': parcel.legaldesc,
      'Zoning': parcel.zoning,
      '# of Buildings': parcel.num_buildings
    }
    return (
      (
        <div style={{display: 'flex'}}>
        <table>
          {Object.keys(data).map(k => (
            <tr>
              <td className="fw7 w4 pv1" style={{borderBottom: '1px dashed #ddd'}}>{k}</td>
              <td className="pl2 fw4" style={{borderBottom: '1px dashed #ddd'}}>{data[k]}</td>
            </tr>
          ))}
        </table>
        </div>
      )
    )
  }
}


export default ParcelDetailTable