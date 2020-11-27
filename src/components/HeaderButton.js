import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export const HeaderButton = ({ icon, onClick, active=false }) => (
  <button className={`text-lg hover:bg-gray-400 py-2 px-3 rounded inline-flex items-center`} onClick={onClick}>
    <FontAwesomeIcon icon={icon} style={active ? {color: 'black'} : {color: 'rgba(0,0,0,0.25)'}}/>
  </button>
);
