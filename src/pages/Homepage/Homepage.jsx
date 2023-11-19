import { Link } from "react-router-dom";
import styles from "./Homepage.module.css";
import PageNav from "../../components/PageNav/PageNav";

export default function Homepage() {
	return (
		<main className={styles.homepage}>
			<PageNav />
			<section>
				<h1>Travel World</h1>
				<h2>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti,
					aliquam! Ipsam rem sit nihil, voluptas, debitis natus odit omnis
					tempore quis vel, veniam dolor suscipit voluptatem ea? Sequi,
					reprehenderit ea.
				</h2>
				<Link to='/login' className='cta'>
					Start tracking now
				</Link>
			</section>
		</main>
	);
}
