import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const MapTitle = ({ icon, children }) => (
  <div className="flex items-center mr-2">
    <FontAwesomeIcon icon={icon} className="mx-2 text-md" />
    <h2 className="border-none font-light text-md">{children}</h2>
  </div>
);

const MapTitleSection = ({ children }) => (
  <div className="bg-det-light-green flex items-center py-1 px-1 justify-between z-40 absolute w-full leading-none">{children}</div>
);

export { MapTitleSection, MapTitle };
