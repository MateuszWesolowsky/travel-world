import {
	ReactNode,
	createContext,
	useContext,
	useEffect,
	useState,
} from "react";
import CityTypes from "../types";

interface CitiesContexttProps {
	cities: CityTypes[];
	isLoading: boolean;
	currentCity: CityTypes | object;
	getCity: (id: string) => void;
}

interface CitiesProviderProps {
	children: ReactNode;
}

const BASE_URL = `http://localhost:9000`;

const CitiesContext = createContext<CitiesContexttProps | null>(null);

function CitiesProvider({ children }: CitiesProviderProps) {
	const [cities, setCities] = useState<CityTypes[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [currentCity, setCurrentCity] = useState({});

	useEffect(() => {
		const fetchCities = async () => {
			try {
				setIsLoading(true);
				const res = await fetch(`${BASE_URL}/cities`);
				const data: CityTypes[] = await res.json();
				setCities(data);
			} catch {
				alert(`There was an error loading..`);
			} finally {
				setIsLoading(false);
			}
		};
		fetchCities();
	}, []);

	async function getCity(id: string) {
		try {
			setIsLoading(true);
			const res = await fetch(`${BASE_URL}/cities/${id}`);
			const data = await res.json();
			setCurrentCity(data);
		} catch {
			alert(`There was an error loading..`);
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<CitiesContext.Provider
			value={{
				cities,
				isLoading,
				currentCity,
				getCity,
			}}>
			{children}
		</CitiesContext.Provider>
	);
}

const useCities = () => {
	const context = useContext(CitiesContext);
	if (context === undefined)
		throw Error("CitiesContext was used outside the CitiesProvider");
	return context;
};

export { CitiesProvider, useCities };
