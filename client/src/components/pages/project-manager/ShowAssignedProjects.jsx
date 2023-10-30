import axios from 'axios';
import '../../../assets/css/ShowAssignedProjects.css';
import Header from '../../common/Header';
import SidebarPm from '../../common/SidebarPm';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { Link, Navigate } from 'react-router-dom';

const urlProject = 'http://localhost:3000/users/getProjectManagerInfo/';

export default function ShowAssignedProjects() {
	const { userData } = useContext(AuthContext);

	const [projectData, setProjectData] = useState([]);

	const idUser = userData.id_user;

	const getProjectData = async () => {
		const res = await axios.get(urlProject + idUser);
		const project = res.data.data[0];
		setProjectData(project);
	};

	useEffect(() => {
		getProjectData();
	}, []);

	return (
		<>
			<main className="main-home">
				<SidebarPm></SidebarPm>
				<section className="section-right">
					<Header></Header>
					<section className="projects-assignment-pm">
						<h2>Listado de sus proyectos</h2>
						{projectData.length === 1 && projectData[0].id_project === null ? (
							<h3>Usted no tiene proyectos asignados para ver</h3>
						) : (
							projectData.map((project, index) => (
								<section className="my-projects-table" key={index}>
									<div>
										<h3>Nombre del proyecto</h3>
										<p>{project.name_project}</p>
									</div>
									<div>
										<h3>Área del proyecto</h3>
										<p>{project.area_project}</p>
									</div>
									<div>
										<h3>Tiempo estimado</h3>
										<p>
											Inicio: {project.start_date_project.split('T')[0]} <br />
											Fin: {project.end_date_project.split('T')[0]}
										</p>
									</div>
									<div>
										<h3>Horas asignadas</h3>
										<p>{project.assigned_hours}hs</p>
									</div>
									<div>
										<h3>Horas totales</h3>
										<p>{project.hours_estimation}hs</p>
									</div>
									<div>
										<Link to={`/pm/projects/${project.id_project}`}>Ver</Link>
									</div>
								</section>
							))
						)}
					</section>
				</section>
			</main>
		</>
	);
}
