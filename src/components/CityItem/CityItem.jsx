import { Link } from "react-router-dom";
import styles from "./CityItem.module.css";
import { useCities } from "../../context/CitiesContex";

const formatDate = (date) =>
	new Intl.DateTimeFormat("en", {
		day: "numeric",
		month: "long",
		year: "numeric",
	}).format(new Date(date));

function CityItem({ city }) {
	const { currentCity, deleteCity } = useCities();
	const handleDelete = (e) => {
		e.preventDefault();
		deleteCity(city._id);
	};

	return (
		<li>
			<Link
				className={`${styles.cityItem} ${
					city._id === currentCity._id ? styles["cityItem--active"] : ""
				}`}
				to={`${city._id}?lat=${city.position.lat}&lng=${city.position.lng}`}>
				<span className={styles.countryCode}>{city.countryCode}</span>
				<h3 className={styles.name}>{city.cityName}</h3>
				<time className={styles.date}>({formatDate(city.date)})</time>
				<button className={styles.deleteBtn} onClick={handleDelete}>
					&times;
				</button>
			</Link>
		</li>
	);
}

export default CityItem;
