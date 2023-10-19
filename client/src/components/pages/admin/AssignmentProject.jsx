import Sidebar from '../../common/Sidebar';
import '../../../assets/css/AssignmentProject.css';
import Header from '../../common/Header';
import BackIcon from '../../../assets/icons/back-icon.svg';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import AssignModal from './AssignModal';
import user from '../../../assets/images/user-2.png';

const url = 'http://localhost:3000/';
const urlEmployee = 'http://localhost:3000/project/viewFreeEmployees/';
const urlEmployeeFromProject = 'http://localhost:3000/project/showEmployees/';

export default function AssignmentProject() {
	const [project, setProject] = useState({
		name: '',
		area: '',
		start: '',
		end: '',
		hours: 0,
		assignedHours: 0,
		idProject: 0,
	});

	const [employee, setEmployee] = useState([]);
	const [employeeAssign, setEmployeeAssign] = useState([]);
	const [skillSelected, setSkillSelected] = useState([]);

	const inputChange = (e) => {
		e.target.checked
			? setSkillSelected([...skillSelected, e.target.name])
			: setSkillSelected(
					skillSelected.filter((skill) => skill !== e.target.name)
			  );
	};

	const { id } = useParams();

	const getProjectById = async () => {
		const res = await axios.get(url + id);
		const data = res.data.projects[0];
		console.log(data, 'proyecto data');
		setProject({
			name: data.name_project,
			area: data.area_project,
			start: data.start_date_project.split('T')[0],
			end: data.end_date_project.split('T')[0],
			hours: data.hours_estimation,
			assignedHours: data.assigned_hours,
			idProject: data.id_project,
		});
	};

	const getFreeEmployees = async () => {
		let selected_project = id;
		const res = await axios.get(urlEmployee + selected_project);
		const data = res.data.data;
		setEmployee(data);
		console.log(data, 'Empleados libres');
	};

	const viewEmployeeFromSelectedProject = async () => {
		const id_project = id;
		const res = await axios.get(urlEmployeeFromProject + id_project);
		const data = res.data.data;
		setEmployeeAssign(data);
		console.log(data, 'Empleados del proyecto seleccionado');
	};

	const deleteEmployee = async (proyecto, empleado) => {
		let project_id = proyecto;
		let employee_id = empleado;
		console.log(project_id);
		console.log(employee_id);
		await axios.delete(`${url}project/${project_id}/${employee_id}`);

		load();
	};

	async function load() {
		await getProjectById();
		await getFreeEmployees();
		await viewEmployeeFromSelectedProject();
	}

	useEffect(() => {
		load();
	}, []);

	return (
		<>
			<main className="main-home">
				<Sidebar></Sidebar>
				<section className="section-right">
					<Header></Header>
					<section className="show-projects-assignment">
						<div>
							<Link to="/admin/assignment">
								<img src={BackIcon} alt="" />
							</Link>
							<p>Asignar a un proyecto</p>
						</div>
						<section className="data">
							<div>
								<div className="table">
									<div className="td">
										<h3>Nombre del proyecto</h3>
										<p>{project.name}</p>
									</div>
									<div className="td">
										<h3>Área del proyecto</h3>
										<p>{project.area}</p>
									</div>
									<div className="td">
										<h3>Tiempo estimado</h3>
										<p>
											Inicio: {project.start} <br /> Fin: {project.end}
										</p>
									</div>
								</div>
								<div className="bar">
									<h2>
										Horas del proyecto: <span>{project.hours}hs</span>
									</h2>
									<p>Horas asignadas:</p>
									<div>
										<progress
											value={
												isNaN((project.assignedHours * 100) / project.hours)
													? 0
													: (project.assignedHours * 100) / project.hours
											}
											max="100"
										></progress>
										<p>
											{project.assignedHours}hs/{project.hours}hs
										</p>
									</div>
								</div>
							</div>
							<div className="staff">
								<h2>Staff Seleccionado</h2>
								{employeeAssign.map((e, index) => (
									<div key={index}>
										<p>
											{e.name} {e.lastname}
										</p>
										<button
											onClick={() =>
												deleteEmployee(project.idProject, e.id_employee)
											}
										>
											Quitar
										</button>
									</div>
								))}
							</div>
						</section>
						<h2 className="title-filter">Filtros</h2>
						<section className="filter">
							<div>
								<input
									type="checkbox"
									id="css"
									name="css"
									onChange={inputChange}
								/>
								<label htmlFor="css">CSS</label>
							</div>
							<div>
								<input
									type="checkbox"
									id="javascript"
									name="javascript"
									onChange={inputChange}
								/>
								<label htmlFor="javascript">JavaScript</label>
							</div>
							<div>
								<input
									type="checkbox"
									id="node"
									name="node"
									onChange={inputChange}
								/>
								<label htmlFor="node">Node</label>
							</div>
							<div>
								<input
									type="checkbox"
									id="react"
									name="react"
									onChange={inputChange}
								/>
								<label htmlFor="react">React</label>
							</div>
							<div>
								<input
									type="checkbox"
									id="sql"
									name="sql"
									onChange={inputChange}
								/>
								<label htmlFor="sql">SQL</label>
							</div>
						</section>
						<h2 className="title-employee">Empleados: </h2>
						<section className="employee">
							{employee
								.filter(function (e) {
									let coincidencias = 0;
									for (let i = 0; i < e.skills.length; i++) {
										for (let j = 0; j < skillSelected.length; j++) {
											if (e.skills[i] === skillSelected[j]) {
												coincidencias++;
											}
										}
									}
									if (coincidencias === skillSelected.length) {
										return true;
									} else {
										return false;
									}
								})
								.map((e, index) => (
									<div className="cardEmployee" key={index}>
										<h3>
											{e.name} {e.lastname}
										</h3>
										<div>
											<img src={user} alt="" />
											<div className="text">
												<p>Horas Disponibles: {e.free_hours}</p>
												<p>Horas Usadas: {e.used_hours} </p>
												<p>Horas Totales: {e.total_hours}</p>
												<p>Habilidades: {e.skills.join(', ')}</p>
											</div>
										</div>
										<AssignModal
											idProject={project.idProject}
											idEmployee={e.id_employee}
											load={load}
											nameSurname={`${e.name} ${e.lastname}`}
											freeHours={e.free_hours}
											usedHours={e.used_hours}
										></AssignModal>
									</div>
								))}
						</section>
					</section>
				</section>
			</main>
		</>
	);
}
