import Sidebar from '../Sidebar';
import '../../assets/css/AssignmentProject.css';
import Header from '../Header';
import BackIcon from '../../assets/icons/back-icon.svg';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import AssignModal from './AssignModal';


/* Llamo al endpoint del proyecto */
const url = 'http://localhost:3000/';
/* Llamo al endpoint del proyecto que me trae empleados libres */
const urlEmployee = 'http://localhost:3000/project/viewFreeEmployees/';
/* Llamo al endpoint del proyecto que me trae empleados asignados al proyecto  */
const urlEmployeeFromProject = 'http://localhost:3000/project/showEmployees/';

export default function AssignmentProject() {
	const [project, setProject] = useState({
		name: '',
		area: '',
		start: '',
		end: '',
		hours: 0,
		assignedHours: 0,
		idProject: 0
	})
	/* Horas a asignar */
	const [hoursToAssign, setHoursToAssign] = useState(0)
	/* Empleados del proyecto */
	const [employee, setEmployee] = useState([])
	/* Empleados del proyecto asignado */
	const [employeeAssign, setEmployeeAssign] = useState([])
	

	/* Obtener datos del proyecto */
	const { id } = useParams()

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
			idProject: data.id_project
		});

	}

	const getFreeEmployees = async () => {
		let selected_project = id;
		const res = await axios.get(urlEmployee + selected_project);
		const data = res.data.data;
		setEmployee(data);
		console.log(data, 'Empleados libres');
	}


	const viewEmployeeFromSelectedProject = async () => {
		const id_project = id;
		const res = await axios.get(urlEmployeeFromProject + id_project)
		const data = res.data.data;
		setEmployeeAssign(data);
		console.log(data, 'Empleados del proyecto seleccionado');
	}

	const assignEmployee = async (proyecto, empleado, horas) => {
		let project_id = proyecto;
		let employee_id = empleado;
		let hours_to_assign = horas;

		const res = await axios.post(`${url}project/${project_id}/${employee_id}/${hours_to_assign}`)
		setHoursToAssign(0)
		load()
	}

	const deleteEmployee = async(proyecto, empleado) => {
		let project_id = proyecto
		let employee_id = empleado 
		await axios.delete(`${url}project/${project_id}/${employee_id}`)
		load()
	}

	async function load() {
		await getProjectById()
		await getFreeEmployees()
		await viewEmployeeFromSelectedProject()
	}

	useEffect(() => {
		load()
	}, []);

	return (
		<>
			<main className="main-home">
				<Sidebar></Sidebar>
				<section className="section-right">
					<Header></Header>
					<section className="show-projects-assignment">
						<div>
							<Link to="/panel/assignment">
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
							<div>
								<p>Staff Seleccionado</p>
								{
									employeeAssign.map((e,index)=>(
										<div key={index}>
											<p>{e.name} {e.lastname}</p>
											<button onClick={() => deleteEmployee(project.idProject, e.id_employee)} >Quitar</button>
										</div>
									))
								}
							</div>
						</section>
						<section className="employee">
							{employee.map((e, index) => (
								<div
									className="cardEmployee"
									key={index}
								>
									<h1>
										{e.name} {e.lastname}
									</h1>
									<p>Horas Disponibles: {e.free_hours}</p>
									<p>Horas Usadas: {e.used_hours} </p>
									<p>Horas Totales: {e.total_hours}</p>
									<AssignModal>
										<p>Seleccione la cantidad de horas</p>
										<input
											onChange={(e) => setHoursToAssign(e.target.value)}
											type="number"
											name="assignHours"
											id=""
											required
										/>
										{hoursToAssign}
										{project.idProject}
										<button onClick={() => assignEmployee(project.idProject, e.id_employee, hoursToAssign)}> Aceptar </button>
									</AssignModal>
								</div>
							))}
						</section>

					</section>
				</section>
			</main>
		</>
	);
}
