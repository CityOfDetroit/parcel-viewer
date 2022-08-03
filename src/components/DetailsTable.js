import moment from "moment";
import React from "react";

import SectionH3 from "./SectionH3";

function DetailsTable({ parcelData, parcelApiData, mobile }) {
  let d = parcelData;
  let e = parcelApiData;

  return (
    <section className="w-full overflow-y-auto px-1 details-table">
      <section className="details-section">
        <SectionH3>Ownership</SectionH3>
        <table className="parcel-details">
          <tbody>
            <tr>
              <td>Taxpayer</td>
              <td>{e.taxpayer1}</td>
            </tr>
            {e.taxpayer2 && (
              <tr>
                <td>Taxpayer (extended)</td>
                <td>{e.taxpayer2}</td>
              </tr>
            )}
            <tr>
              <td>Taxpayer Address</td>
              <td>{`${e.taxpaddr}, ${e.taxpcity}, ${e.taxpstate}`}</td>
            </tr>
            {e.saledate && (
              <tr>
                <td>Last Sale Date</td>
                <td>{moment(e.saledate).format("LL")}</td>
              </tr>
            )}
            {e.saledate && (
              <tr>
                <td>Last Sale Price</td>
                <td>{`$${parseInt(e.saleprice).toLocaleString()}`}</td>
              </tr>
            )}
            <tr>
              <td>PRE %</td>
              <td>{e.pre}</td>
            </tr>
            {e.nez !== "" && (
              <tr>
                <td>NEZ</td>
                <td>{e.nez}</td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
      <section className="details-section">
        <SectionH3>Usage & classification</SectionH3>
        <table className="parcel-details">
          <tbody>
            {/* <tr>
              <td>
                Improved?
              </td>
              <td>
                {d.is_improved === 1 ? `Yes` : `No`}
              </td>
            </tr> */}
            <tr>
              <td>Property Class</td>
              <td>
                {e.propclass} - {e.propclassdesc}
              </td>
            </tr>
            <tr>
              <td>Property Use</td>
              <td>
                {e.usecode} - {d.use_code_desc}
              </td>
            </tr>
            <tr>
              <td>Zoning</td>
              <td>{e.zoning}</td>
            </tr>
            <tr>
              <td># of Buildings</td>
              <td>{e.resbldgcount + e.cibldgcount}</td>
            </tr>
            {e.totalfloor && (
              <tr>
                <td>Total Floor Area (sf)</td>
                <td>{e.totalfloor}</td>
              </tr>
            )}
            {e.style && (
              <tr>
                <td>Style</td>
                <td>{e.style}</td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
      <section className="details-section">
        <SectionH3>Taxation</SectionH3>
        <table className="parcel-details">
          <tbody>
            <tr>
              <td>Tax Status</td>
              <td>{e.taxstatus}</td>
            </tr>
            <tr>
              <td>Assessed Value</td>
              <td>{`$${parseInt(e.assessedvalue).toLocaleString()}`}</td>
            </tr>
            <tr>
              <td>Taxable Value</td>
              <td>{`$${parseInt(e.assessedvalue).toLocaleString()}`}</td>
            </tr>
          </tbody>
        </table>
      </section>
      <section className="details-section">
        <SectionH3>Dimensions</SectionH3>
        <table className="parcel-details">
          <tbody>
            <tr>
              <td>Total Acreage</td>
              <td>{e.totalacreage} ac</td>
            </tr>
            <tr>
              <td>Total Square Footage</td>
              <td>{e.totalsqft} sf</td>
            </tr>
            <tr>
              <td>Depth x Frontage (ft)</td>
              <td>
                {e.depth} x {e.frontage}
              </td>
            </tr>
          </tbody>
        </table>
      </section>
      <section className="details-section">
        <SectionH3>Legal description</SectionH3>
        <p className="mt-2 max-w-8 bg-det-gray px-4 py-2 font-mono text-sm leading-4">{e.legaldescription}</p>
      </section>
    </section>
  );
}

export default DetailsTable;
