import React, { useState } from "react";
import { Outlet } from "react-router-dom";

import "./css/App.css";

const App = () => {
  const [darkTheme, setDarkTheme] = useState(false);
  const handleThemeChange = () => {
    setDarkTheme(!darkTheme);
  };
  return (
    <div className={`App ${darkTheme && "dark-theme"}`}>
      <div className="Navbar">
        <h1>Where in the world?</h1>
        <div id="themeToggle">
          <input type="checkbox" id="theme" onChange={handleThemeChange} />
          <label htmlFor="theme">
            {darkTheme ? (
              <i className="fa-solid fa-moon"></i>
            ) : (
              <i className="fa-solid fa-sun"></i>
            )}
            Dark Mode
          </label>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default App;
