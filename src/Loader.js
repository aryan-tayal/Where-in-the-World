import React from "react";
import "./css/Loader.css";
const Loader = () => {
  const globeIcons = [
    <i className="fa-solid fa-earth-oceania"></i>,
    <i className="fa-solid fa-earth-europe"></i>,
    <i className="fa-solid fa-earth-asia"></i>,
    <i className="fa-solid fa-earth-africa"></i>,
    <i className="fa-solid fa-earth-americas"></i>,
  ];
  return (
    <div className="Loader">
      <div className="Loader-content">
        <div className="Loader-orbit">
        <i className="fa-solid fa-plane-up"></i>
        </div>
        <div className="Loader-globe">
          {globeIcons[Math.floor(Math.random() * globeIcons.length)]}
        </div>
      </div>
    </div>
  );
};

export default Loader;
