import React from 'react'
import StreetView from './StreetView'
import {HeaderButton} from './HeaderButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStreetView, faMapMarked } from '@fortawesome/free-solid-svg-icons'

const SVToggle = ({setMap, map, parcel}) => (
  <HeaderButton icon={map ? faStreetView : faMapMarked}
    onClick={() => parcel && setMap(!map)}
    />
)

export default SVToggle