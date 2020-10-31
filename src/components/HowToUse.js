import React from "react";

function HowToUse({ props }) {
  return (
    <div className="about-container">
      <div>
        <h2>About</h2>
        <p>
          The Parcel Explorer is a tool developed by the City of Detroit's Innovation and Emerging Technology Team. The parcel information is provided via the
          City of Detroit's Office of the Assessor. All data is available on the City's Open Data Portal at{" "}
          <a href="http://data.detroitmi.gov" target="_blank">
            data.detroitmi.gov
          </a>
          . Street view imagery is provided by the City of Detroit's GIS team.{" "}
        </p>
      </div>
      <div>
        <h2>How To Use</h2>
        <p>
          To find information about a parcel, begin by either locating the parcel on the map and clicking it or by typing in the address. Once the parcel is
          selected, the user may click street view in lower right corner to see street level imagery of the parcel, scroll the address at the bottom of the page
          to see further information about the parcel, or click or search a different parcel.
        </p>
      </div>
    </div>
  );
}

export default HowToUse;
