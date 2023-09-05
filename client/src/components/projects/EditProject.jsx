import Sidebar from '../Sidebar';
import '../../assets/css/EditProject.css';
import Header from '../Header';
import BackIcon from '../../assets/icons/back-icon.svg';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

/* Llamo al endpoint del proyecto */
const url = 'http://localhost:3000/';
/* Llamo al endpoint para actualizar el proyecto */
const urlUpdate = 'http://localhost:3000/editProject';

let fechaActual = new Date();

let fechaReferencia = new Date(fechaActual);
fechaReferencia.setMonth(fechaReferencia.getMonth() + 3);

/* Formateo YYYY-MM-DD */
fechaActual = fechaActual.toISOString().split('T')[0];
fechaReferencia = fechaReferencia.toISOString().split('T')[0];

export default function EditProject() {
	/* useStates para el nombre actual del blog */
	const [projectName, setProjectName] = useState('');
	const [projectArea, setProjectArea] = useState('');
	const [projectStart, setProjectStart] = useState(fechaActual);
	const [projectEnd, setProjectEnd] = useState(fechaReferencia);
	const [projectHours, setProjectHours] = useState(0);

	/* useStates para el futuro nombre del blog */
	const [newProjectName, setNewProjectName] = useState('');
	const [newProjectArea, setNewProjectArea] = useState('');
	const [newProjectStart, setNewProjectStart] = useState(fechaActual);
	const [newProjectEnd, setNewProjectEnd] = useState(fechaReferencia);
	const [newProjectHours, setNewProjectHours] = useState(0);

	/* useState para la solicitud ok del proyecto */
	const [status, setStatus] = useState('');

	/* Handles para actualizar el input con el nuevo valor */
	const newName = (event) => {
		setNewProjectName(event.target.value);
		setStatus('');
	};

	const newAreaName = (event) => {
		setNewProjectArea(event.target.value);
		setStatus('');
	};

	const newHours = (event) => {
		setNewProjectHours(event.target.value);
		setStatus('');
	};

	const startDate = (event) => {
		setNewProjectStart(
			new Date(event.target.value).toISOString().split('T')[0]
		);
		setStatus('');
	};

	const endDate = (event) => {
		setNewProjectEnd(new Date(event.target.value).toISOString().split('T')[0]);
		setStatus('');
	};

	/* obtengo el id del blog */
	const { id } = useParams();
	/* obtengo haciendo una solicitud al back, los datos del proyecto a editar */
	const getBlogById = async () => {
		const res = await axios.get(url + id);
		const data = res.data.projects[0];
		setProjectName(data.name_project);
		setProjectArea(data.area_project);
		setProjectStart(data.start_date_project.split('T')[0]);
		setProjectEnd(data.end_date_project.split('T')[0]);
		setProjectHours(data.hours_estimation);

		setNewProjectName(data.name_project);
		setNewProjectArea(data.area_project);
		setNewProjectStart(data.start_date_project.split('T')[0]);
		setNewProjectEnd(data.end_date_project.split('T')[0]);
		setNewProjectHours(data.hours_estimation);
	};

	useEffect(() => {
		getBlogById();
	}, []);

	/* Funcion para actualizar un blog */

	const updateProject = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.patch(urlUpdate, {
				name_project: newProjectName,
				area_project: newProjectArea,
				start_date_project: newProjectStart,
				end_date_project: newProjectEnd,
				hours_estimation: newProjectHours,
				id_project: id,
			});

			setNewProjectName('');
			setNewProjectArea('');
			setNewProjectStart(fechaActual);
			setNewProjectEnd(fechaReferencia);
			setNewProjectHours(0);

			setStatus(response.statusText);

			getBlogById();
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<>
			<main className="main-home">
				<Sidebar></Sidebar>
				<section className="section-right">
					<Header></Header>
					<section className="edit-project-section">
						<div>
							<Link to="/panel/projects">
								<img src={BackIcon} alt="" />
							</Link>
							<p>Editar proyecto</p>
						</div>
						<form onSubmit={updateProject}>
							<label htmlFor="">Nombre del proyecto:</label>
							<span>{projectName}</span>
							<input type="text" value={newProjectName} onChange={newName} />

							<label htmlFor="">Área del proyecto:</label>
							<span> {projectArea} </span>
							<input
								type="text"
								value={newProjectArea}
								onChange={newAreaName}
							/>

							<label htmlFor="">Tiempo estimado</label>
							<div>
								<label htmlFor="">Inicio:</label>
								<span> {projectStart}</span>
							</div>
							<input type="date" value={newProjectStart} onChange={startDate} />

							<div>
								<label htmlFor="">Fin:</label>
								<span> {projectEnd}</span>
							</div>
							<input type="date" value={newProjectEnd} onChange={endDate} />

							<label htmlFor="">Horas estimadas:</label>
							<span>{projectHours}hs</span>
							<input
								type="number"
								value={newProjectHours}
								onChange={newHours}
							/>

							{status === 'OK' ? (
								<span className="createSucces">
									Proyecto actualizado con éxito
								</span>
							) : (
								''
							)}
							<button type="submit">Confirmar edición</button>
						</form>
					</section>
				</section>
			</main>
		</>
	);
}
