import moment from "moment";
import React from "react";

import SectionH3 from "./SectionH3";

function DetailsTable({ parcelData, parcelApiData, mobile }) {
  let d = parcelData;

  console.log(d)
  return (
    <section className="w-full overflow-y-auto px-1 details-table">
      <section className="details-section">
        <SectionH3>Ownership</SectionH3>
        <table className="parcel-details">
          <tbody>
            <tr>
              <td>Taxpayer</td>
              <td>{d.taxpayer_1}</td>
            </tr>
            {d.taxpayer2 && (
              <tr>
                <td>Taxpayer (extended)</td>
                <td>{d.taxpayer_2}</td>
              </tr>
            )}
            <tr>
              <td>Taxpayer Address</td>
              <td>{`${d.taxpayer_address}, ${d.taxpayer_city}, ${d.taxpayer_state}, ${d.taxpayer_zip_code}`}</td>
            </tr>
            {d.saledate && (
              <tr>
                <td>Last Sale Date</td>
                <td>{moment(d.sale_date).format("LL")}</td>
              </tr>
            )}
            {d.saledate && (
              <tr>
                <td>Last Sale Price</td>
                <td>{`$${parseInt(d.amt_sale_price).toLocaleString()}`}</td>
              </tr>
            )}
            <tr>
              <td>PRE %</td>
              <td>{d.pct_pre_claimed}</td>
            </tr>
            {d.nez !== "" && (
              <tr>
                <td>NEZ</td>
                <td>{d.nez}</td>
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
                {d.property_class} - {d.property_class_description}
              </td>
            </tr>
            <tr>
              <td>Property Use</td>
              <td>
                {d.use_code} - {d.use_code_description}
              </td>
            </tr>
            <tr>
              <td>Zoning</td>
              <td>{d.zoning_district}</td>
            </tr>
            <tr>
              <td># of Buildings</td>
              <td>{d.num_bldgs}</td>
            </tr>
            {d.totalfloor && (
              <tr>
                <td>Total Floor Area (sf)</td>
                <td>{d.total_floor_area}</td>
              </tr>
            )}
            {d.style && (
              <tr>
                <td>Style</td>
                <td>{d.building_style}</td>
              </tr>
            )}
            <tr>
              <td>Historic Designation</td>
              <td>{d.local_historic_district}</td>
            </tr>
          </tbody>
        </table>
      </section>
      <section className="details-section">
        <SectionH3>Taxation</SectionH3>
        <table className="parcel-details">
          <tbody>
            <tr>
              <td>Tax Status</td>
              <td>{d.tax_status_description}</td>
            </tr>
            <tr>
              <td>Assessed Value</td>
              <td>{`$${parseInt(d.amt_assessed_value).toLocaleString()}`}</td>
            </tr>
            <tr>
              <td>Taxable Value</td>
              <td>{`$${parseInt(d.amt_taxable_value).toLocaleString()}`}</td>
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
              <td>{d.total_acreage} ac</td>
            </tr>
            <tr>
              <td>Total Square Footage</td>
              <td>{d.total_square_footage} sf</td>
            </tr>
            <tr>
              <td>Depth x Frontage (ft)</td>
              <td>
                {d.depth} x {d.frontage}
              </td>
            </tr>
          </tbody>
        </table>
      </section>
      <section className="details-section">
        <SectionH3>Legal description</SectionH3>
        <p className="mt-2 max-w-8 bg-det-gray px-4 py-2 font-mono text-sm leading-4">{d.legal_description}</p>
      </section>
    </section>
  );
}

export default DetailsTable;
