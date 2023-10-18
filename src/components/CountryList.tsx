import CityTypes from "../types";
import CountryItem from "./CountryItem";
import styles from "./CountryList.module.css";
import Message from "./Message";
import Spinner from "./Spinner";

interface CountryListProps {
	cities: CityTypes[];
	isLoading: boolean;
}
interface CountryArr {
	country: string;
	emoji: string;
}

function CountryList({ cities, isLoading }: CountryListProps) {
	if (isLoading) return <Spinner />;

	if (!cities.length)
		return (
			<Message message='Add Your first country by clicking on a country on the map' />
		);

	const countries: CityTypes[] = cities.reduce(
		(arr:CountryArr[], city: CityTypes) => {
			if (!arr.map((el) => el.country).includes(city.country)) {
				return [...arr, { country: city.country, emoji: city.emoji }];
			} else {
				return arr;
			}
		},
		[]
	);

	return (
		<ul className={styles.countryList}>
			{countries.map((country) => (
				<CountryItem country={country} />
			))}
		</ul>
	);
}

export default CountryList;
