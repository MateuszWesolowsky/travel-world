import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";

function Map() {
	const [serchParams, setSearchParams] = useSearchParams('');
    const navigate = useNavigate()

	const lat = serchParams.get("lat");
	const lng = serchParams.get("lng");

	return (
		<div className={styles.mapContainer} onClick={() => navigate('form')}>
			<h1>Map</h1>
			<h2>
				Position: {lat}, {lng}
			</h2>
			<button
				onClick={() => {
					setSearchParams({
						lat: 25,
						lng: 20,
					});
				}}>
				Change pos
			</button>
		</div>
	);
}

export default Map;
