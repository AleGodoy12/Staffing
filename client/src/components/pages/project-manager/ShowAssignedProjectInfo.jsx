import { Link, useParams } from 'react-router-dom';
import Header from '../../common/Header';
import SidebarPm from '../../common/SidebarPm';
import BackIcon from '../../../assets/icons/back-icon.svg';
import '../../../assets/css/ShowAssignedProjectInfo.css';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import axios from 'axios';

const urlProject = 'http://localhost:3000/users/getProjectManagerInfo/';

export default function ShowAssignedProjectInfo() {
	const { userData } = useContext(AuthContext);

	const { id } = useParams();

	const [projectData, setProjectData] = useState({
		project: [],
		leader: [],
		employees: [],
	});

	const idUser = userData.id_user;

	const getProjectData = async () => {
		const res = await axios.get(urlProject + idUser);
		const data = res.data.data;

		let project = data[0].filter(
			(project) => project.id_project === parseInt(id)
		);
		let leader = data[1];
		let employees = data[2].filter(
			(employee) => employee.id_project === parseInt(id)
		);

		setProjectData({
			...projectData,
			project,
			leader,
			employees,
		});
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
					<section className="project-info-section">
						<div>
							<Link to="/pm/projects">
								<img src={BackIcon} alt="" />
							</Link>
							<p>Información del proyecto</p>
						</div>
						<section className="project-leader">
							<h2>Datos del proyecto</h2>
							{projectData.project.map((e, index) => (
								<div className="table-leader-project-info" key={index}>
									<div>
										<h3>Nombre</h3>
										<p>{e.name_project}</p>
									</div>
									<div>
										<h3>Área</h3>
										<p>{e.area_project}</p>
									</div>
									<div>
										<h3>Tiempo estimado</h3>
										<p>Inicio: {e.start_date_project.split('T')[0]}</p>
										<p>Fin: {e.end_date_project.split('T')[0]}</p>
									</div>
									<div>
										<h3>Horas asignadas</h3>
										<p>{e.assigned_hours}hs</p>
									</div>
									<div>
										<h3>Horas totales</h3>
										<p>{e.hours_estimation}hs</p>
									</div>
								</div>
							))}
						</section>
						<section className="leader">
							<h2>Líder del proyecto</h2>
							{projectData.leader.map((e, index) => (
								<div className="table-employee-info" key={index}>
									<div>
										<h3>Nombre</h3>
										<p>{e.name}</p>
									</div>
									<div>
										<h3>Apellido</h3>
										<p>{e.lastname}</p>
									</div>
									<div>
										<h3>Mail</h3>
										<p>{e.mail}</p>
									</div>
									<div>
										<h3>Rol</h3>
										<p>{e.role}</p>
									</div>
									<div>
										<h3>Compañía</h3>
										<p>{e.company}</p>
									</div>
									<div>
										<h3>Disponibilidad</h3>
										<p>Horas usadas: {e.used_hours}hs</p>
										<p>Horas disponibles: {e.free_hours}hs</p>
										<p>Horas totales: {e.total_hours}hs</p>
									</div>
								</div>
							))}
						</section>

						<section className="project-employees">
							<h2>Empleados del proyecto</h2>
							{projectData.employees.length === 0 ? (
								<h3>El proyecto seleccionado no tiene empleados asignados</h3>
							) : (
								projectData.employees.map((e, index) => (
									<div className="table-employee-info" key={index}>
										<div>
											<h3>Nombre</h3>
											<p>{e.name}</p>
										</div>
										<div>
											<h3>Apellido</h3>
											<p>{e.lastname}</p>
										</div>
										<div>
											<h3>Mail</h3>
											<p>{e.mail}</p>
										</div>
										<div>
											<h3>Rol</h3>
											<p>{e.role}</p>
										</div>
										<div>
											<h3>Compañía</h3>
											<p>{e.company}</p>
										</div>
										<div>
											<h3>Disponibilidad</h3>
											<p>Horas usadas: {e.used_hours}hs</p>
											<p>Horas disponibles: {e.free_hours}hs</p>
											<p>Horas totales: {e.total_hours}hs</p>
										</div>
									</div>
								))
							)}
						</section>
					</section>
				</section>
			</main>
		</>
	);
}
