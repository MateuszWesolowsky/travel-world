import CityTypes from "../types";
import CityItem from "./CityItem";
import styles from "./CityList.module.css";
import Message from "./Message";
import Spinner from "./Spinner";

interface CityListProps {
	cities: CityTypes[];
	isLoading: boolean;
}

function CityList({ cities, isLoading }: CityListProps) {
	if (isLoading) return <Spinner />;

	if (!cities.length)
		return (
			<Message message='Add Your first city by clicking on a city on the map' />
		);

	return (
		<ul className={styles.cityList}>
			{cities.map((city) => (
				<CityItem city={city} key={city.id} />
			))}
		</ul>
	);
}

export default CityList;
