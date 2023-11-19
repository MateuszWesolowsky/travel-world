import PageNav from "../../components/PageNav/PageNav";
import styles from "./About.module.css";

export default function About() {
	return (
		<main className={styles.about}>
			<PageNav />
			<section>
				<div>
					<h2>About Travel World App</h2>
					<p>
						Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vitae vel
						labore mollitia iusto. Recusandae quos provident, laboriosam fugit
						voluptatem iste.
					</p>
					<p>
						Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vitae vel
						labore mollitia iusto. Recusandae quos provident, laboriosam fugit
						voluptatem iste mollitia iusto. Recusandae quos provident, laboriosam fugit
						voluptatem iste.
					</p>
				</div>
			</section>
		</main>
	);
}
