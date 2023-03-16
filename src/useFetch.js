import { useState, useEffect } from "react";
import axios from "axios";

const useFetch = (query, pageNumber, region, perPageLimit = 15) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [countries, setCountries] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  useEffect(() => {
    setCountries([]);
  }, [query]);
  useEffect(() => {
    setCountries([]);
  }, [region]);
  useEffect(() => {
    try {
      setLoading(true);
      setError(false);
      const getData = async () => {
        const { data } = await axios.get("https://restcountries.com/v3.1/all");
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
        const limitedCountries = filteredCountries.slice(
          (pageNumber - 1) * perPageLimit,
          pageNumber * perPageLimit
        );
        setCountries((prevCountries) => [
          ...prevCountries,
          ...limitedCountries,
        ]);
        setHasMore(limitedCountries.length > 0);
        setLoading(false);
      };
      getData();
    } catch (e) {
      setError(true);
    }
  }, [query, pageNumber, perPageLimit, region]);
  return { loading, error, countries, hasMore };
};

export default useFetch;
