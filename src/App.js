import React, { useState } from "react";
import { Outlet } from "react-router-dom";

import "./css/App.css";

const App = () => {
  const [darkTheme, setDarkTheme] = useState(
    localStorage.getItem("darkTheme") || false
  );
  const handleThemeChange = () => {
    setDarkTheme(!darkTheme);
    localStorage.setItem("darkTheme", darkTheme);
  };
  return (
    <div className={`App ${darkTheme && "dark-theme"}`}>
      <div className="Navbar">
        <h1>Where in the world?</h1>
        <div id="themeToggle">
          <input type="checkbox" id="theme" onChange={handleThemeChange} />

          {darkTheme ? (
            <label htmlFor="theme">
              <i className="fa-solid fa-sun"></i> Light Mode
            </label>
          ) : (
            <label htmlFor="theme">
              <i className="fa-regular fa-moon"></i>Dark Mode
            </label>
          )}
        </div>
      </div>
      <Outlet />
      <div className="Footer">
        Made with <i className="fa-solid fa-heart"></i> by{" "}
        <a href="https://github.com/aryan-tayal" target="new">
          Aryan Tayal
        </a>{" "}
        for a FrontEnd Mentor Challenge.
      </div>
    </div>
  );
};

export default App;
