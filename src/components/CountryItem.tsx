import CityTypes from "../types";
import styles from "./CountryItem.module.css";

interface CountryProps {
	country: CityTypes;
}

function CountryItem({ country }:CountryProps) {
  return (
    <li className={styles.countryItem}>
      <span>{country.emoji}</span>
      <span>{country.country}</span>
    </li>
  );
}

export default CountryItem;
