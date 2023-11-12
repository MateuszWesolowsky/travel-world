import { useEffect, useState } from "react";
import styles from "./Login.module.css";
import PageNav from "../../components/PageNav/PageNav";
import { useAuth } from "../../context/FakeAuthContext";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import Message from "../../components/Message/Message";

export default function Login() {
	const [email, setEmail] = useState("test@example.com");
	const [password, setPassword] = useState("123");

	const { login, isAuthenticated, error } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		if (isAuthenticated) {
			navigate("/app", { replace: true });
		}
	}, [isAuthenticated, navigate, error]);

	const handleLogin = (e) => {
		e.preventDefault();
		if (email && password) login(email, password);
	};

	return (
		<main className={styles.login}>
			<PageNav />
			<form className={styles.form}>
				<div className={styles.row}>
					<label htmlFor='email'>Email address</label>
					<input
						placeholder='test@example.com'
						type='email'
						id='email'
						onChange={(e) => setEmail(e.target.value)}
						value={email}
					/>
				</div>

				<div className={styles.row}>
					<label htmlFor='password'>Password</label>
					<input
						placeholder='123'
						type='password'
						id='password'
						onChange={(e) => setPassword(e.target.value)}
						value={password}
					/>
				</div>

				<div>
					<Button onClick={handleLogin} type='primary'>
						Login
					</Button>
					{error && <Message message='Wrong email or password !' />}
				</div>
			</form>
		</main>
	);
}
