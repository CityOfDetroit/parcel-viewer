import React, { useState } from "react";

import HowToUse from "./HowToUse";

function Menu({ props, fadeClass, setFadeClass }) {
  const [subMenu, setSubmenu] = useState("menu");
  const toggleSubMenu = (target) => {
    setSubmenu(target);
  };
  const toggleMenu = (e) => {
    if (subMenu === "menu") {
      fadeClass ? setFadeClass(false) : setFadeClass(true);
    } else {
      setSubmenu("menu");
    }
  };

  return (
    <div className={"menu-container " + (fadeClass ? "isOpen" : "")}>
      <div className="menu-header-container">
        <div className="search-button-placeholder" onClick={toggleMenu}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path d="M257.5 445.1l-22.2 22.2c-9.4 9.4-24.6 9.4-33.9 0L7 273c-9.4-9.4-9.4-24.6 0-33.9L201.4 44.7c9.4-9.4 24.6-9.4 33.9 0l22.2 22.2c9.5 9.5 9.3 25-.4 34.3L136.6 216H424c13.3 0 24 10.7 24 24v32c0 13.3-10.7 24-24 24H136.6l120.5 114.8c9.8 9.3 10 24.8.4 34.3z" />
          </svg>
          BACK
        </div>
        <h1 className="menu-header">
          {subMenu === "menu" && "Menu"}
          {subMenu === "layers" && "Map Layers"}
          {subMenu === "how" && "How To Use"}
        </h1>
      </div>
      {subMenu === "how" && <HowToUse></HowToUse>}
      {subMenu === "menu" && (
        <ul>
          <li>
            <a onClick={() => toggleSubMenu("how")}>About</a>
          </li>
          <li>
            <span style={{ fontSize: "0.8em" }}>Version: 1.45</span>
          </li>
        </ul>
      )}
    </div>
  );
}

export default Menu;
