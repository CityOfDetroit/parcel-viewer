import React from 'react';

function MenuButton( {props, fadeClass, setFadeClass} ) {

  const toggleMenu = (e) => {
    fadeClass ? setFadeClass(false) : setFadeClass(true)
  }
    
    return(
        <div className="menu-btn-container" onClick={toggleMenu}>
          <label className="menu-btn">
            <span />
            <span />
            <span />
            MENU
          </label>
        </div>
    )}

export default MenuButton;