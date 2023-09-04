import Sidebar from '../Sidebar';
import '../../assets/css/AssignmentProject.css';
import Header from '../Header';

export default function AssignmentProject() {
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
