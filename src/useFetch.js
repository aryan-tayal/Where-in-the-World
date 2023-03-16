import { useState, useEffect } from "react";
import axios from "axios";

const useFetch = (query, pageNumber, region, perPageLimit = 15) => {
  // Set state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [countries, setCountries] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  // Set countries to empty array if query changes
  useEffect(() => {
    setCountries([]);
  }, [query]);
  // Set countries to empty array if region changes
  useEffect(() => {
    setCountries([]);
  }, [region]);
  // Fetching Data
  useEffect(() => {
    // Set ignore variable for StrictMode
    let ignore = false;
    try {
      // Page Loading without error by default
      setLoading(true);
      setError(false);
      // Function to getData from API
      const getData = async () => {
        // Data from restcountries.com
        const { data } = await axios.get("https://restcountries.com/v3.1/all");
        // Filter countries based on region and query
        const filteredCountries = data.filter((c) => {
          if (region.length) {
            return (
              c.name.common.toLowerCase().includes(query.toLowerCase()) &&
              region.includes(c.region.toLowerCase())
            );
          } else {
            return c.name.common.toLowerCase().includes(query.toLowerCase());
          }
        });
        // Limit countries to 15 for infinite scroll
        const limitedCountries = filteredCountries.slice(
          (pageNumber - 1) * perPageLimit,
          pageNumber * perPageLimit
        );
        // Check to ignore in StrictMode(prevent duplicates)
        if (!ignore) {
          // Add new countries to the countries array
          setCountries((prevCountries) => [
            ...prevCountries,
            ...limitedCountries,
          ]);
        }
        // Check if more countries exist
        setHasMore(limitedCountries.length > 0);
        // Page loaded
        setLoading(false);
      };
      // Call function
      getData();
    } catch (e) {
      // ERROR!
      setError(true);
    }
    return () => {
      ignore = true;
    };
  }, [query, pageNumber, perPageLimit, region]);
  // Return data
  return { loading, error, countries, hasMore };
};

export default useFetch;
