import React, { useState, useRef, useCallback } from "react";
import Card from "./Card";
import Loader from "./Loader";
import useFetch from "./useFetch";
import "./css/CardContainer.css";

const CardContainer = ({ allRegions }) => {
  // State
  const [searchInput, setSearchInput] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [region, setRegion] = useState([]);
  const [regionDropdownOpen, setRegionDropdownOpen] = useState(false);
  // Fetch Hook
  const { countries, hasMore, loading, error } = useFetch(
    searchInput,
    pageNumber,
    region
  );
  // Infinite Scroll
  const observer = useRef();
  const lastCountryElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );
  // Handle Search Input Change
  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
    setPageNumber(1);
  };
  // Handle Region Dropdown Change
  const handleRegionChange = (e) => {
    setRegion((values) =>
      e.target.checked
        ? [...values, e.target.value]
        : values.filter((v) => e.target.value !== v)
    );
  };
  // Close Region Dropdown
  const closeRegionDropdown = () => {
    if (regionDropdownOpen) {
      setRegionDropdownOpen(false);
    }
  };
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
            {allRegions.map((r) => (
              <div className="Controls-dropdown-item" key={r}>
                <input
                  type="checkbox"
                  value={r.toLowerCase()}
                  id={r.toLowerCase()}
                  name="region"
                  onChange={handleRegionChange}
                />
                <label htmlFor={r.toLowerCase()}>{r}</label>
              </div>
            ))}
            {/* <div className="Controls-dropdown-item">
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
            </div> */}
          </div>
        </div>
      </div>
      <div className="Card-container">
        {countries.map((c, i) => {
          if (countries.length === i + 1) {
            return (
              <Card
                flag={c.flags.png}
                name={c.name.common}
                population={c.population.toLocaleString()}
                region={c.region}
                capital={c.capital}
                key={i}
                ref={lastCountryElementRef}
              />
            );
          } else {
            return (
              <Card
                flag={c.flags.png}
                name={c.name.common}
                population={c.population.toLocaleString()}
                region={c.region}
                capital={c.capital}
                key={i}
              />
            );
          }
        })}
      </div>
      <div>{loading && <Loader />}</div>
      <div>{error && "Error..."}</div>
    </div>
  );
};

CardContainer.defaultProps = {
  allRegions: ["Africa", "Asia", "Americas", "Europe", "Oceania"],
};

export default CardContainer;
