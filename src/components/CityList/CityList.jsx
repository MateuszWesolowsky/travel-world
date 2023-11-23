import { useCities } from "../../context/CitiesContex";
import CityItem from "../CityItem/CityItem";
import styles from "./CityList.module.css";
import Message from "../Message/Message";
import Spinner from "../Spinner/Spinner";

function CityList() {
	const { cities, isLoading } = useCities();
	if (isLoading) return <Spinner />;

	if (!cities.length)
		return (
			<Message message='Add Your first city by clicking on a city on the map' />
		);

	return (
		<ul className={styles.cityList}>
			{cities.map((city) => (
				<CityItem city={city} key={city._id} />
			))}
		</ul>
	);
}

export default CityList;
