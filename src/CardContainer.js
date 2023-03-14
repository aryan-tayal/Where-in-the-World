import React, { useEffect, useState } from "react";
import Card from "./Card";
import axios from "axios";
import "./css/CardContainer.css";

const CardContainer = () => {
  const [countries, setCountries] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [region, setRegion] = useState([]);
  const [regionDropdownOpen, setRegionDropdownOpen] = useState(false);
  useEffect(() => {
    const getAllCountries = async () => {
      const res = await axios.get("https://restcountries.com/v3.1/all");
      setCountries(res.data);
    };
    getAllCountries();
  }, []);
  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
  };
  const handleRegionChange = (e) => {
    setRegion((values) =>
      e.target.checked
        ? [...values, e.target.value]
        : values.filter((v) => e.target.value !== v)
    );
  };
  const closeRegionDropdown = () => {
    if (regionDropdownOpen) {
      setRegionDropdownOpen(false);
    }
  };
  let cards = [];
  const regionCountries = countries.filter(
    (c) => region.includes(c.region.toLowerCase()) || !region.length
  );
  if (searchInput.length) {
    const filteredCountries = regionCountries.filter((c) =>
      c.name.common.toLowerCase().includes(searchInput.toLowerCase())
    );
    cards = filteredCountries.map((c) => (
      <Card
        flag={c.flags.png}
        name={c.name.common}
        population={c.population.toLocaleString()}
        region={c.region}
        capital={c.capital}
        key={c.name.official}
      />
    ));
  } else {
    cards = regionCountries.map((c) => (
      <Card
        flag={c.flags.png}
        name={c.name.common}
        population={c.population.toLocaleString()}
        region={c.region}
        capital={c.capital}
        key={c.name.official}
      />
    ));
  }
  return (
    <div className="Container" onClick={closeRegionDropdown}>
      <div className="Controls">
        <div className="Controls-input">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input
            type="text"
            placeholder="Search for a country..."
            onChange={handleSearchChange}
          />
        </div>
        <div className="Controls-dropdown">
          <button onClick={() => setRegionDropdownOpen(!regionDropdownOpen)}>
            Filter by Region<i className="fa-solid fa-chevron-down"></i>
          </button>
          <div
            className={`Controls-dropdown-items ${
              regionDropdownOpen && "open"
            }`}
          >
            <div className="Controls-dropdown-item">
              <input
                type="checkbox"
                value="americas"
                id="americas"
                name="region"
                onChange={handleRegionChange}
              />
              <label htmlFor="americas">Americas</label>
            </div>
            <div className="Controls-dropdown-item">
              <input
                type="checkbox"
                value="asia"
                id="asia"
                name="region"
                onChange={handleRegionChange}
              />
              <label htmlFor="asia">Asia</label>
            </div>
            <div className="Controls-dropdown-item">
              <input
                type="checkbox"
                value="europe"
                id="europe"
                name="region"
                onChange={handleRegionChange}
              />
              <label htmlFor="europe">Europe</label>
            </div>
            <div className="Controls-dropdown-item">
              <input
                type="checkbox"
                value="africa"
                id="africa"
                name="region"
                onChange={handleRegionChange}
              />
              <label htmlFor="africa">Africa</label>
            </div>
            <div className="Controls-dropdown-item">
              <input
                type="checkbox"
                value="oceania"
                id="oceania"
                name="region"
                onChange={handleRegionChange}
              />
              <label htmlFor="oceania">Oceania</label>
            </div>
          </div>
        </div>
      </div>
      <div className="Card-container">
        {cards.length ? cards : "No search results found!"}
      </div>
    </div>
  );
};

export default CardContainer;
