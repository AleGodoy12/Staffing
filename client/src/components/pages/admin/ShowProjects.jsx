import Sidebar from '../../common/Sidebar';
import '../../../assets/css/ShowProjects.css';
import { Link } from 'react-router-dom';
import Header from '../../common/Header';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from '../../common/Modal';

const url = 'http://localhost:3000/';
const url2 = 'http://localhost:3000/deleteProject/';

export default function ShowProjects() {
	const [projects, setProjects] = useState([]);

	const getProjects = async () => {
		const res = await axios.get(url);
		setProjects(res.data.projects);
		return;
	};

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
							<Link to="/admin/projects/create">Crear Proyecto</Link>
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
									<Link to={`/admin/projects/edit/${e.id_project}`}>
										Editar
									</Link>
								</div>
								<div className="td">
									<Modal
										type={'danger'}
										action={'Confirmar eliminación del proyecto'}
										question={`¿Está seguro que desea eliminar el proyecto ${e.name_project}?`}
										msg={'Esta acción es irreversible'}
										buttonText={'Eliminar'}
										execute={() => deleteProject(e.id_project)}
									></Modal>
								</div>
							</section>
						))}
					</section>
				</section>
			</main>
		</>
	);
}
