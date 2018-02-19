import React from 'react';

import Zones from '../data/zones.js'

const ZoningClass = ({ zone, selected }) => (
    <div className={"ma1 o-100"} style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start'}}>
        <span className="pa2 dib white fw7" style={{backgroundColor: Zones[zone].color}}>
            {zone}: {Zones[zone].name.replace('District', '').replace("Special Development , ", "")}
        </span>
    </div>
)

export default ZoningClass;