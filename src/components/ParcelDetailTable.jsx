import React from 'react'
import moment from 'moment'
import parseInt from 'lodash/parseInt'
import Zones from '../data/zones.js'

class ParcelDetailTable extends React.Component {
  render() {
    const parcel = this.props.parcel

    if (parcel === undefined) {
      return (
        <div>
          <span className="red fw5">Couldn't find record!</span>
        </div>
      );
    }

    if (parcel === null) {
      return (
        <div>
          <span className="red fw5">Loading....</span>
        </div>
      );
    }

    const data = {
      'Address': parcel.ADDRESS,
      'Owner': `${parcel.OWNER1}`,
      'Owner (ext.)': `${parcel.OWNER2 ? `${parcel.OWNER2}` : ``}`,
      'Owner Address': `${parcel.OWN_STREET}, ${parcel.OWN_CITY}, ${parcel.OWN_STATE}`,
      'Last Sale Date': parcel.SALE_DATE && parcel.SALE_DATE !== " " ? moment(parcel.SALE_DATE).format('LL') : `No record`,
      'Last Sale Price': `$${parseInt(parcel.SALE_PRICE).toLocaleString()}` || `No record`,
      'Taxable Status': `${parcel.TAX_STATUS}` || `Unknown`,
      'Taxable Value': `$${parseInt(parcel.TXBL_VAL).toLocaleString()}` || `No record`,
      'Land Value': `$${parseInt(parcel.LAND_VALUE).toLocaleString()}` || `No record`,
      'Improved Value': `$${parseInt(parcel.IMP_VALUE).toLocaleString()}` || `No record`,
      'Depth x Frontage': `${parcel.DEPTH} x ${parcel.FRONTAGE} ft`,
      'Total Acres': `${parcel.TOTAL_ACRE}`,
      'Zoning': parcel.ZONING ? `${parcel.ZONING} ${Zones[parcel.ZONING].name}` : `No record`,
      '# of Buildings': parcel.NUM_BLDGS
    }

    return (
      <div>
        <table>
          <tbody>
            {Object.keys(data).map(k => (
              data[k] !== '' ? 
              (<tr key={k}>
                <td className="fw7 w4 pv1" style={{borderBottom: '1px dashed #ddd', alignItems: 'top'}}>{k}</td>
                <td className="pl2 fw4 h2" style={{borderBottom: '1px dashed #ddd'}}>{data[k]}</td>
              </tr>)
              : null
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}


export default ParcelDetailTable