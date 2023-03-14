import React from "react";
import { useLoaderData } from "react-router-dom";
import { Link } from "react-router-dom";
import "./css/Country.css";

const Country = () => {
  let country = useLoaderData();
  return (
    <div className="Container">
      <Link to="/" className="Back">
        <i className="fa-solid fa-arrow-left-long"></i> Back
      </Link>
      <div className="Country">
        <div className="Country-img">
          <img src={country.flags.png} alt={country.name.common} />
        </div>
        <div className="Country-body">
          <h2 className="Country-title">{country.name.common}</h2>
          <div className="Country-details">
            <div>
              {country.name.nativeName ? (
                <div className="Country-text">
                  <b>Native Name</b> :
                  {Object.values(country.name.nativeName)[0].common}
                </div>
              ) : (
                ""
              )}
              <div className="Country-text">
                <b>Population</b> : {country.population.toLocaleString()}
              </div>
              <div className="Country-text">
                <b>Region</b> : {country.region}
              </div>
              {country.subregion ? (
                <div className="Country-text">
                  <b>Subregion</b> : {country.subregion}
                </div>
              ) : (
                ""
              )}
              {country.capital ? (
                <div className="Country-text">
                  <b>Capital</b> : {country.capital[0]}
                </div>
              ) : (
                ""
              )}
            </div>
            <div>
              <div className="Country-text">
                <b>Top Level Domain</b> : {country.tld[0]}
              </div>
              {country.currencies ? (
                <div className="Country-text">
                  <b>Currencies</b> :{" "}
                  {Object.values(country.currencies)[0].name}
                </div>
              ) : (
                ""
              )}
              {country.languages ? (
                <div className="Country-text">
                  <b>Languages</b> :{" "}
                  {Object.values(country.languages).join(", ")}
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
          {country.countryBorders.length ? (
            <div className="Country-borders">
              <b>Border Countries:</b>
              <div>
                {country.countryBorders.map((border) => (
                  <Link
                    to={`/country/${border.name.common.toLowerCase()}`}
                    key={border.name.common}
                  >
                    {border.name.common}
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default Country;
