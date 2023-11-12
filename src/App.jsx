import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import "./index.css";

import Product from "./pages/Product/Product";
import Pricing from "./pages/Pricing/Pricing";
import Homepage from "./pages/Homepage/Homepage";
import AppLayout from "./pages/AppLayout/AppLayout";
import PageNotFound from "./pages/NotFound/PageNotFound";
import Login from "./pages/Login/Login";
import CityList from "./components/CityList/CityList";
import CountryList from "./components/CountryList/CountryList";
import City from "./components/City/City";
import Form from "./components/Form/Form";
import { CitiesProvider } from "./context/CitiesContex";
import { AuthProvider } from "./context/FakeAuthContext";

function App() {
	return (
		<CitiesProvider>
			<AuthProvider>
				<BrowserRouter>
					<Routes>
						<Route index element={<Homepage />} />
						<Route path='pricing' element={<Pricing />} />
						<Route path='product' element={<Product />} />
						<Route path='login' element={<Login />} />
						<Route path='app' element={<AppLayout />}>
							<Route index element={<Navigate replace to='cities' />} />
							<Route path='cities' element={<CityList />} />
							<Route path='cities/:id' element={<City />} />
							<Route path='countries' element={<CountryList />} />
							<Route path='form' element={<Form />} />
						</Route>
						<Route path='*' element={<PageNotFound />} />
					</Routes>
				</BrowserRouter>
			</AuthProvider>
		</CitiesProvider>
	);
}

export default App;
