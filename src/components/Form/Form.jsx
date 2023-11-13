import { useEffect, useState } from "react";

import styles from "./Form.module.css";
import Button from "../Button/Button";
import Message from "../Message/Message";
import Spinner from "../Spinner/Spinner";
import BackButton from "../Button/BackButton";
import { useUrlPosition } from "../hooks/useUrlPosition";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useCities } from "../../context/CitiesContex";
import { useNavigate } from "react-router-dom";

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";
function Form() {
	const [isLoadingGeocoding, setIsLoadingGeocoding] = useState();
	const [cityName, setCityName] = useState("");
	const [country, setCountry] = useState("");
	const [countryCode, setCountryCode] = useState("");
	const [date, setDate] = useState(new Date());
	const [notes, setNotes] = useState("");
	const [lat, lng] = useUrlPosition();
	const [geocodingError, setGeocodingError] = useState("");
	const { createCity, isLoading } = useCities();
	const navigate = useNavigate();

	useEffect(() => {
		if (!lat && !lng) return;
		const fetchCityData = async () => {
			try {
				setIsLoadingGeocoding(true);
				setGeocodingError("");
				const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`);
				const data = await res.json();
				if (!data.countryCode)
					throw new Error(
						"That doesn't semm to be a city. Click somewhere else 😉"
					);
				setCityName(data.city || data.locality);
				setCountry(data.countryName);
				setCountryCode(data.countryCode);
			} catch (err) {
				setGeocodingError(err.message);
			} finally {
				setIsLoadingGeocoding(false);
			}
		};
		fetchCityData();
	}, [lat, lng]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!cityName || !date) return;

		const newCity = {
			cityName,
			country,
			countryCode,
			date,
			notes,
			position: { lat, lng },
			//id - is going to be automatically created by the JSON server
		};
		await createCity(newCity);
		navigate("/app/cities");
	};

	if (isLoadingGeocoding) return <Spinner />;

	if (!lat && !lng) return <Message message='Start by clicking on the map' />;

	if (geocodingError) return <Message message={geocodingError} />;

	return (
		<form
			className={`${styles.form} ${isLoading ? styles.loading : ""}`}
			onSubmit={handleSubmit}>
			<div className={styles.row}>
				<label htmlFor='cityName'>City name</label>
				<input
					id='cityName'
					disabled
					onChange={(e) => setCityName(e.target.value)}
					value={cityName}
				/>
				<span className={styles.flag}>{countryCode}</span>
			</div>

			<div className={styles.row}>
				<label htmlFor='date'>When did you go to {cityName}?</label>
				<DatePicker
					id='date'
					onChange={(date) => setDate(date)}
					selected={date}
					dateFormat='dd/MM/yyyy'
				/>
			</div>

			<div className={styles.row}>
				<label htmlFor='notes'>Notes about your trip to {cityName}</label>
				<textarea
					id='notes'
					onChange={(e) => setNotes(e.target.value)}
					value={notes}
				/>
			</div>

			<div className={styles.buttons}>
				<Button type='primary'>Add</Button>
				<BackButton />
			</div>
		</form>
	);
}

export default Form;
