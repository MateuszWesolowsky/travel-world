import PageNav from "../../components/PageNav/PageNav";
import styles from "./Product.module.css";

export default function Product() {
	return (
		<main className={styles.product}>
			<PageNav />
			<section>
				<div>
					<h2>Travel World App!</h2>
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo est
						dicta illum vero culpa cum quaerat architecto sapiente eius non
						soluta, molestiae nihil laborum, placeat debitis, laboriosam at fuga
						perspiciatis?
					</p>
					<p>
						Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corporis
						doloribus libero sunt expedita ratione iusto, magni, id sapiente
						sequi officiis et.
					</p>
				</div>
			</section>
		</main>
	);
}
