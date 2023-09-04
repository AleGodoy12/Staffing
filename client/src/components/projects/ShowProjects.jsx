import Sidebar from '../Sidebar';
import '../../assets/css/ShowProjects.css';
import { Link } from 'react-router-dom';
import Header from '../Header';
import { useEffect, useState } from 'react';
import axios from 'axios';

/* Llamo al endpoint del proyecto */
const url = 'http://localhost:3000/';
/* Llamo al endpoint para eliminar proyectos */
const url2 = 'http://localhost:3000/deleteProject/';

export default function ShowProjects() {
	//estados
	const [projects, setProjects] = useState([]);

	//procedimiento que trae todos los proyectos
	const getProjects = async () => {
		const res = await axios.get(url);
		setProjects(res.data.projects);
		return;
	};

	// procedimiento para eliminar un proyecto
	const deleteProject = async (id) => {
		console.log(id);
		await axios.delete(`${url2}${id}`);
		getProjects();
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
					<section className="projects-section">
						<div>
							<Link to="/panel/projects/create">Crear Proyecto</Link>
							<h3>Lista de proyectos creados</h3>
						</div>
						{projects.map((e) => (
							<section className="table" key={e.id_project}>
								<div className="td">
									<h3>Nombre del proyecto</h3>
									<p>{e.name_project}</p>
								</div>
								<div className="td">
									<h3>Área del proyecto</h3>
									<p>{e.area_project}</p>
								</div>
								<div className="td">
									<h3>Tiempo estimado</h3>
									<p>
										Inicio: {e.start_date_project.split('T')[0]} <br />
										Fin: {e.end_date_project.split('T')[0]}
									</p>
								</div>
								<div className="td">
									<h3>Horas estimadas</h3>
									<p>{e.hours_estimation}hs</p>
								</div>
								<div className="td">
									<Link to={`/panel/projects/edit/${e.id_project}`}>
										Editar
									</Link>
								</div>
								<div className="td">
									<button onClick={() => deleteProject(e.id_project)}>
										Eliminar
									</button>
								</div>
							</section>
						))}
					</section>
				</section>
			</main>
		</>
	);
}
