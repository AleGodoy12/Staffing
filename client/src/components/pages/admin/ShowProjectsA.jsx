import Sidebar from '../../common/Sidebar';
import '../../../assets/css/ShowProjectsA.css';
import Header from '../../common/Header';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';

const url = 'http://localhost:3000/';

export default function ShowProjectsA() {
	const [projects, setProjects] = useState([]);
	const [bool, setBool] = useState(true);

	const changeTrue = () => {
		setBool(true);
	};
	const changeFalse = () => {
		setBool(false);
	};

	const getProjects = async () => {
		const res = await axios.get(url);
		setProjects(res.data.projects);
		return;
	};

	useEffect(() => {
		getProjects();
	}, []);

	return (
		<>
			<main className="main-home">
				<Sidebar></Sidebar>
				<section className="section-right">
					<Header></Header>
					<section className="projects-assignment">
						<div>
							<h2>Asignar Empleados</h2>
							<a onClick={changeTrue}>Proyectos activos sin asignacion</a>
							<a onClick={changeFalse}>Proyectos activos con asignacion</a>
						</div>
						<section>
							{bool
								? projects.map((e, index) =>
										e.assigned_hours === 0 ? (
											<div key={index} className="card">
												<h2>{e.name_project}</h2>
												<div>
													<p>{e.area_project}</p>
													<p>Inicio: {e.start_date_project.split('T')[0]} </p>
													<p>Fin: {e.end_date_project.split('T')[0]}</p>
												</div>
												<Link to={`/admin/assignment/${e.id_project}`}>
													Asignar
												</Link>
											</div>
										) : (
											''
										)
								  )
								: projects.map((e, index) =>
										e.assigned_hours !== 0 ? (
											<div key={index} className="card">
												<h2>{e.name_project}</h2>
												<div>
													<p>{e.area_project}</p>
													<p>Inicio: {e.start_date_project.split('T')[0]} </p>
													<p>Fin: {e.end_date_project.split('T')[0]}</p>
												</div>
												<Link to={`/admin/assignment/${e.id_project}`}>
													Ver
												</Link>
											</div>
										) : (
											''
										)
								  )}
						</section>
					</section>
				</section>
			</main>
		</>
	);
}
