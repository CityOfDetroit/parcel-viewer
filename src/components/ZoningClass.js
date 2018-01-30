import React, { Component } from 'react';

import Zones from '../data/zones.js'

const ZoningClass = ({ zone, selected }) => (
    <div className={selected ? "ma1 o-100" : "ma1 o-50"} style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start'}}>
        <span className="pa2 dib white fw7" style={{backgroundColor: Zones[zone].color}}>{zone}</span>
        <span className={selected ? "dib ml2 fw7" : "dib ml2"}>{Zones[zone].name.replace('District', '').replace("Special Development , ", "")}</span>
    </div>
)

export default ZoningClass;