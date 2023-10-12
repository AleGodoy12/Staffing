import Sidebar from '../../common/Sidebar';
import '../../../assets/css/Home.css';
import Header from '../../common/Header';

export default function Home() {
	return (
		<>
			<main className="main-home">
				<Sidebar></Sidebar>
				<section className="section-right">
					<Header></Header>
				</section>
			</main>
		</>
	);
}
