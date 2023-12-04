import React from "react";

const Disclaimer = ({ setDisclaimed }) => {

  const handleAcceptance = () => {
    localStorage.setItem("disclaimed", true);
    setDisclaimed(true);
  }

  return (
    <div className="disclaimer m-2 p-2 md:m-12 md:p-12 flex flex-col gap-4">
      <h1 className="mb-4">Full Disclaimer</h1>

      <div>

      <h4>Limitation of Use</h4>
      <p>
        The Parcel View viewer (hereafter “Viewer”) and all data presented
        therein is provided by City of Detroit (hereafter “City”) to give access
        to data for the City of Detroit area developed by City departments,
        incorporated cities within the City, and other local, state and federal
        entities, public and commercial. The Viewer uses Geographic Information
        Systems (hereafter “GIS”) technology to provide a visual display of data
        for the convenience of the end user (hereafter “User”).
      </p>

      <p>
        It is to be used for reference purposes only as a guide to finding
        assessment, planning, and other information and is not suitable for
        site-specific or business decision making and should not be used for
        making financial or any other commitments. Such decisions should only be
        made after validating information based on additional information
        available from the appropriate City office or other entities. NO PORTION
        OF THE INFORMATION PRESENTED SHOULD BE CONSIDERED OR USED AS A LEGAL
        DOCUMENT.
      </p>

      <p>
        The data presented is for informational purposes only and should not be
        used for legal, engineering, or surveying purposes. THE VIEWER IS NOT TO
        BE USED FOR PROPERTY DESCRIPTIONS, OR DETERMINATION OF LEGAL TITLE.
        Property descriptions must be obtained from surveys or deeds. The
        compilation of countywide tax parcel and related data, street
        centerline, and other data results in a seamless dataset derived from
        many sources, particularly surveys, deeds, City and city resolutions,
        and orthophotography. It should be interpreted as the best available
        compilation, but SHOULD NEVER BE SUBSTITUTED FOR SURVEY OR DEED
        INFORMATION.
      </p>

      <p>
        While every effort has been made to ensure the accuracy, correctness,
        and timeliness of data presented in the Viewer, the City assumes no
        responsibility for errors or omissions, even if the City is advised of
        the possibility of such damage. The City does not warrant that the
        operation of the Viewer will be uninterrupted or that defects in data
        will be corrected.
      </p>

      <p>
        The Viewer provides GIS functionality available to the User to alter the
        display of data, such as altering color of feature symbols and toggling
        feature labels, loading data into the Viewer, and performing queries and
        other GIS functions. It is incumbent on the User to understand the
        effects of such functions on display and presentation of data. Please
        watch the training videos for details on how to use this application.
      </p>
      </div>

      <div>

      <h4>Assumption of Risk</h4>

      <p>
        The User understands and acknowledges that the data presented herein are
        subject to constant change and is not guaranteed to be accurate, correct
        or complete, nor that it will meet the requirements of the User. The
        entire risk as to quality, performance, and usefulness of the Viewer,
        associated data, and conclusions drawn from its use rest with the User.
        The City does not warrant that the operation of the Viewer will be
        uninterrupted or that defects in data will be corrected.
      </p>

      <p>
        Products may have a number of errors which may include but are not
        limited to the following types of errors:
      </p>

      <ul className="ml-2 list-disc list-inside">
        <li>
          Spatial errors - The areas depicted in the data are approximate, and
          are not necessarily accurate to surveying or engineering standards.
          X/Y coordinates may be in error by several hundred feet or more.
        </li>
        <li>
          Registration errors - GIS data layers may not overlay each other
          correctly. For example, parcel boundaries may not align properly with
          underlying orthophotography.
        </li>
        <li>Attribute errors - Database information may be incorrect.</li>
        <li>
          Currency errors - GIS data layers, databases, and documents may not be
          the most current available or may not depict the specified time. All
          data is subject to constant change. Data input lags real-world changes
          by varying periods of time.
        </li>
        <li>
          Completeness errors - Data may be missing or data may be included that
          does not belong.
        </li>
        <li>
          Projection distortion - All map projections introduce distortion by
          representing the irregular shape of the earth's surface on flat maps.
          This affects feature shapes, angles, map distances, and areas.
        </li>
        <li>
          Calculation errors - Results of calculations may not be exact due to
          rounding, precision of stored values, or algorithm differences.
        </li>
        <li>
          Representation errors - Maps or other displays may not properly
          represent the data. For instance, a white line on a white background
          would appear as if it wasn't there. Data may be displayed at an
          inappropriate scale.
        </li>
      </ul>

      <p>
        The information is provided subject to the express condition that the
        user knowingly waives any and all claims for damages against City of
        Detroit and its officers, agents, consultants, contractors, and
        employees that may arise from the use of this data.
      </p>
      </div>

      <div>

      <h4>Availability</h4>

      <p>
        Availability of the Viewer is not guaranteed. Applications, servers, and
        network connections may be unavailable at any time for maintenance or
        unscheduled outages. Outages may be of long duration. Do not create
        dependencies on these services for critical needs.
      </p>
      </div>
      <div>

      <h4>Maintenance of Data</h4>

      <p>
        To assist the City in the maintenance of GIS data, Users should provide
        the City information concerning errors or discrepancies found in using
        the Viewer. Please email: dsa@detroitmi.gov with such information.
      </p>
      </div>

      <button onClick={handleAcceptance} className="bg-gray-800 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded mt-4">
        I have read and agree to the terms of use and disclaimer
      </button>
    </div>

  );
};

export default Disclaimer;
