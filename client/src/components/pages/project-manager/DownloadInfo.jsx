import '../../../assets/css/Home.css';
import Header from '../../common/Header';
import SidebarPm from '../../common/SidebarPm';
import '../../../assets/css/DownloadInfo.css'
import axios from 'axios';
import DownloadIcon from '../../../assets/icons/download-line.svg'

const urlDownload = "http://localhost:3000/download/downloadSelectedInfo/"

export default function DownloadInfo() {

	const downloadData = async (e) => {
		console.log(e.target.value)
		await axios.get(urlDownload + e.target.value)
	}

	return (
		<>
			<main className="main-home">
				<SidebarPm></SidebarPm>
				<section className="section-right">
					<Header></Header>
					<section className='download-section'>
						<h2>Información para descargar</h2>
						<h3>Listado de proyectos</h3>
						<button onClick={downloadData} value={'projects'}>
							<p>Descargar</p>
							<span></span>
							<img src={DownloadIcon} alt="" />	
						</button>

						<h3>Listado de proyectos incluyendo personas asignadas</h3>
						<button onClick={downloadData} value={'projects-employees'}>
							<p>Descargar</p>
							<span></span>
							<img src={DownloadIcon} alt="" />	
						</button>

						<h3>Listado de empleados </h3>
						<button onClick={downloadData} value={'assigned-employees'}>
							<p>Descargar</p>
							
						</button>


						<h3>Listado de empleados con sus habilidades</h3>
						<button onClick={downloadData} value={'employees-skills'} >
							<p>Descargar</p>
							<span></span>
							<img src={DownloadIcon} alt="" />	
						</button>

						<h3>Listado de empleados libres</h3>
						<button onClick={downloadData} value={'free-employees'} >
							<p>Descargar</p>
							<span></span>
							<img src={DownloadIcon} alt="" />	
						</button>

						<h3>Listado de PMs con su proyecto y personas asignadas</h3>
						<button onClick={downloadData} value={'project-manager'} >
							<p>Descargar</p>
							<span></span>
							<img src={DownloadIcon} alt="" />	
						</button>
						
					</section>

				</section>
			</main>
		</>
	);
}
