import { createContext, useContext, useReducer } from "react";

const initialState = {
	user: null,
	isAuthenticated: false,
	error: false,
};

const AuthContext = createContext();

const reducer = (state, action) => {
	switch (action.type) {
		case "login":
			return {
				...state,
				user: action.payload,
				isAuthenticated: true,
			};
		case "logout":
			return {
				...state,
				user: null,
				isAuthenticated: false,
			};
		case "error": {
			return {
				...state,
				error: true,
			};
		}
		default:
			throw new Error("Unknow action");
	}
};

const FAKE_USER = {
	name: "TEST",
	email: "test@example.com",
	password: "123",
	avatar: "https://i.pravatar.cc/100?u=zz",
};

function AuthProvider({ children }) {
	const [state, dispatch] = useReducer(reducer, initialState);
	const { user, isAuthenticated, error } = state;

	const login = (email, password) => {
		if (FAKE_USER.email === email && FAKE_USER.password === password)
			dispatch({
				type: "login",
				payload: FAKE_USER,
			});
			if(FAKE_USER.email !== email || FAKE_USER.password !== password) {
				dispatch({
					type: "error",
				})
			}
			
	};
	const logout = () => {
		dispatch({
			type: "logout",
		});
	};

	return (
		<AuthContext.Provider
			value={{
				user,
				isAuthenticated,
				error,
				login,
				logout,
			}}>
			{children}
		</AuthContext.Provider>
	);
}

function useAuth() {
	const context = useContext(AuthContext);
	if (context === undefined)
		throw new Error("AuthContext was used outside AuthProvider");
	return context;
}

export { AuthProvider, useAuth };
