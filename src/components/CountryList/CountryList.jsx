import { useCities } from "../../context/CitiesContex";
import CountryItem from "../CountryItem/CountryItem";
import styles from "./CountryList.module.css";
import Message from "../Message/Message";
import Spinner from "../Spinner/Spinner";

const CountryList = () => {
	const { cities, isLoading } = useCities();
	if (isLoading) return <Spinner />;

	if (!cities.length)
		return (
			<Message message='Add Your first country by clicking on a country on the map' />
		);

	const countries = cities.reduce((arr, city) => {
		if (!arr.map((el) => el.country).includes(city.country)) {
			return [...arr, city];
		} else {
			return arr;
		}
	}, []);

	return (
		<ul className={styles.countryList}>
			{countries.map((country) => (
				<CountryItem country={country} key={country._id} />
			))}
		</ul>
	);
};

export default CountryList;
