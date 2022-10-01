import React from 'react';
import { Link } from 'react-router-dom';
import DistanceCalculator from 'distance-calculator-js';
import useGeoLocation from './useGeoLocation';

const CarteResto = ({ restau: { name, rating, price_range, id, location } }) => {


    let cout = ""
    let y = price_range

    for (let i = 0; i < y; i++) {
        cout += "$"
    }

    function decimalAdjust(type, value, exp) {
      type = String(type);
      if (!["round", "floor", "ceil"].includes(type)) {
        throw new TypeError(
          "The type of decimal adjustment must be one of 'round', 'floor', or 'ceil'."
        );
      }
      exp = Number(exp);
      value = Number(value);
      if (exp % 1 !== 0 || Number.isNaN(value)) {
        return NaN;
      } else if (exp === 0) {
        return Math[type](value);
      }
      const [magnitude, exponent = 0] = value.toString().split("e");
      const adjustedValue = Math[type](`${magnitude}e${exponent - exp}`);
      // Shift back
      const [newMagnitude, newExponent = 0] = adjustedValue.toString().split("e");
      return Number(`${newMagnitude}e${+newExponent + exp}`);
    }

    const round10 = (value, exp) => decimalAdjust("round", value, exp);
    const link = `/Restaurant/${id}`

    const loc = { lat: location.coordinates[1], long : location.coordinates[0]}
    const userLoc = useGeoLocation();
    const loc2 = { lat: userLoc.coordinates.lat, long : userLoc.coordinates.lng}
    const dist = DistanceCalculator.calculate(loc, loc2, 'km');

  return (
    <div className="resto-result">
      <Link to={`/Restaurant/${id}`} style={{ margin: 10, color: 'inherit', textDecoration: 'inherit'}}> 
          <span className="spansers">{name}    | &#9733;{round10(rating, -1)}/5     |     {cout}     |      {dist}Km</span>
      </Link>
    </div>
  );
}

export default CarteResto;