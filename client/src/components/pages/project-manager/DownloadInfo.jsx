import '../../../assets/css/Home.css';
import Header from '../../common/Header';
import SidebarPm from '../../common/SidebarPm';

export default function DownloadInfo() {
	return (
		<>
			<main className="main-home">
				<SidebarPm></SidebarPm>
				<section className="section-right">
					<Header></Header>
				</section>
			</main>
		</>
	);
}
