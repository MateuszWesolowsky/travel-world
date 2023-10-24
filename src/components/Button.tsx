import styles from "./Button.module.css";

interface Props {
	children: string;
	onClick: () => void;
	type: string;
}

function Button({ children, onClick, type }: Props) {
	return (
		<button onClick={onClick} className={`${styles.btn} ${styles[type]}`}>
			{children}
		</button>
	);
}

export default Button;
