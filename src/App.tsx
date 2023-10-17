import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import Homepage from "./pages/Homepage";
import AppLayout from "./pages/AppLayout";
import PageNotFound from "./pages/PageNotFound";
import Login from "./pages/Login";
import "./index.css";
import CityList from "./components/CityList";
import CityTypes from "./types";
import CountryList from "./components/CountryList";

const BASE_URL = `http://localhost:9000`;

function App() {
	const [cities, setCities] = useState<CityTypes[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);

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

	return (
		<BrowserRouter>
			<Routes>
				<Route index element={<Homepage />} />
				<Route path='pricing' element={<Pricing />} />
				<Route path='product' element={<Product />} />
				<Route path='login' element={<Login />} />
				<Route path='app' element={<AppLayout />}>
					<Route
						index
						element={<CityList cities={cities} isLoading={isLoading} />}
					/>
					<Route
						path='cities'
						element={<CityList cities={cities} isLoading={isLoading} />}
					/>
					<Route
						path='countries'
						element={<CountryList cities={cities} isLoading={isLoading} />}
					/>
					<Route path='form' element={<p>Form</p>} />
				</Route>
				<Route path='*' element={<PageNotFound />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
