import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export const HeaderButton = ({ icon, onClick, className, active=false }) => (
  <button className={`text-lg hover:bg-gray-400 py-2 px-3 rounded inline-flex items-center ${className}`} onClick={onClick}>
    <FontAwesomeIcon icon={icon} className={active ? `text-sm text-gray-800` : `text-sm text-gray-600`}/>
  </button>
);
