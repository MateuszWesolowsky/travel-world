import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { CitiesProvider } from "./context/CitiesContex";
import { AuthProvider } from "./context/FakeAuthContext";
import ProtectedRoute from "./pages/ProtectedRoute/ProtectedRoute";

import CityList from "./components/CityList/CityList";
import CountryList from "./components/CountryList/CountryList";
import City from "./components/City/City";
import Form from "./components/Form/Form";
import SpinnerFullPage from "./components/Spinner/SpinnerFullPage";

const Homepage = lazy(() => import("./pages/Homepage/Homepage"));
const Pricing = lazy(() => import("./pages/Pricing/Pricing"));
const Product = lazy(() => import("./pages/Product/Product"));
const Login = lazy(() => import("./pages/Login/Login"));
const AppLayout = lazy(() => import("./pages/AppLayout/AppLayout"));
const PageNotFound = lazy(() => import("./pages/NotFound/PageNotFound"));

// dist/assets/index-bfa719f9.css   31.88 kB │ gzip:   5.27 kB
// dist/assets/index-aea42fff.js   528.25 kB │ gzip: 149.61 kB

function App() {
	return (
		<CitiesProvider>
			<AuthProvider>
				<BrowserRouter>
					<Suspense fallback={<SpinnerFullPage />}>
						<Routes>
							<Route index element={<Homepage />} />
							<Route path='pricing' element={<Pricing />} />
							<Route path='product' element={<Product />} />
							<Route path='login' element={<Login />} />
							<Route
								path='app'
								element={
									<ProtectedRoute>
										<AppLayout />
									</ProtectedRoute>
								}>
								<Route index element={<Navigate replace to='cities' />} />
								<Route path='cities' element={<CityList />} />
								<Route path='cities/:id' element={<City />} />
								<Route path='countries' element={<CountryList />} />
								<Route path='form' element={<Form />} />
							</Route>
							<Route path='*' element={<PageNotFound />} />
						</Routes>
					</Suspense>
				</BrowserRouter>
			</AuthProvider>
		</CitiesProvider>
	);
}

export default App;
