import React, { useState, useRef, useCallback } from "react";
import Card from "./Card";
import Loader from "./Loader";
import useFetch from "./useFetch";
import Dropdown from "./Dropdown";
import "./css/CardContainer.css";

const CardContainer = ({ allRegions, sortBy }) => {
  // State
  const [searchInput, setSearchInput] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [region, setRegion] = useState([]);
  const [sort, setSort] = useState("Population - Descending");
  // Fetch Hook
  const { countries, hasMore, loading, error } = useFetch(
    searchInput,
    pageNumber,
    region,
    sort
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
  // Handle Sort Dropdown Change
  const handleSortChange = (e) => {
    setSort(e.target.value);
  };
  // Close Sort Dropdown
  return (
    <div className="Container">
      <div className="Controls">
        <div className="Controls-input">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input
            type="text"
            placeholder="Search for a country..."
            onChange={handleSearchChange}
          />
        </div>
        <div className="Controls-dropdown-group">
          <Dropdown
            title={`Sort by ${sort}`}
            items={sortBy}
            handleDropdownChange={handleSortChange}
            type="radio"
            name="sort"
            checked={sort}
          />
          <Dropdown
            title="Filter by Region"
            items={allRegions}
            handleDropdownChange={handleRegionChange}
            type="checkbox"
            name="region"
            checked={region}
          />
        </div>
      </div>
      <div className="Card-container">
        {countries.length
          ? countries.map((c, i) => {
              if (countries.length === i + 1) {
                return (
                  <Card
                    flag={c.flags.png}
                    name={c.name.common}
                    population={c.population.toLocaleString()}
                    region={c.region}
                    capital={c.capital}
                    key={c.name.official}
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
                    key={c.name.official}
                  />
                );
              }
            })
          : "No results found!"}
      </div>
      <div>{loading && <Loader />}</div>
      <div>{error && "Error..."}</div>
    </div>
  );
};

CardContainer.defaultProps = {
  allRegions: ["Africa", "Asia", "Americas", "Europe", "Oceania", "Antarctic"],
  sortBy: ["Alphabetical", "Population - Ascending", "Population - Descending"],
};

export default CardContainer;
