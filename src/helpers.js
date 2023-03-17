const sortCountries = (countries, sort) => {
  let sortedCountries = [];
  if (sort === "Alphabetical") {
    sortedCountries = countries.sort(function (a, b) {
      if (a.name.common < b.name.common) {
        return -1;
      }
      if (a.name.common > b.name.common) {
        return 1;
      }
      return 0;
    });
  } else if (sort === "Population - Ascending") {
    sortedCountries = countries.sort(function (a, b) {
      if (a.population < b.population) {
        return -1;
      }
      if (a.population > b.population) {
        return 1;
      }
      return 0;
    });
  } else if (sort === "Population - Descending") {
    sortedCountries = countries.sort(function (a, b) {
      if (a.population > b.population) {
        return -1;
      }
      if (a.population < b.population) {
        return 1;
      }
      return 0;
    });
  }
  return sortedCountries;
};

const filterCountries = (countries, q, region) => {
  const filteredCountries = countries.filter((c) => {
    if (region.length) {
      return (
        c.name.common.toLowerCase().includes(q.toLowerCase()) &&
        region.includes(c.region.toLowerCase())
      );
    } else {
      return c.name.common.toLowerCase().includes(q.toLowerCase());
    }
  });
  return filteredCountries;
};

export { sortCountries, filterCountries };
