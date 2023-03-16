import React, { forwardRef } from "react";
import { Link } from "react-router-dom";
import "./css/Card.css";

const Card = forwardRef(({ flag, name, population, region, capital }, ref) => {
  return (
    <Link to={`/country/${name}`} ref={ref}>
      <div className="Card">
        <div className="Card-img">
          <img src={flag} alt={name} />
        </div>
        <div className="Card-body">
          <h2 className="Card-title">{name}</h2>
          <div className="Card-text">
            <b>Population</b> : {population}
          </div>
          <div className="Card-text">
            <b>Region</b> : {region}
          </div>
          {capital ? (
            <div className="Card-text">
              <b>Capital</b> : {capital}
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </Link>
  );
});

export default Card;
