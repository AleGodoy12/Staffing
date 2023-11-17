import Sidebar from '../../common/Sidebar';
import '../../../assets/css/EditProject.css';
import Header from '../../common/Header';
import BackIcon from '../../../assets/icons/back-icon.svg';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const url = 'http://localhost:3000/';
const urlUpdate = 'http://localhost:3000/editProject';

let fechaActual = new Date();

let fechaReferencia = new Date(fechaActual);
fechaReferencia.setMonth(fechaReferencia.getMonth() + 3);

fechaActual = fechaActual.toISOString().split('T')[0];
fechaReferencia = fechaReferencia.toISOString().split('T')[0];

export default function EditProject() {
	const [project, setProject] = useState({
		name: '',
		area: '',
		hours: 0,
		start: fechaActual,
		end: fechaReferencia,
	});

	const [newProject, setNewProject] = useState({
		name: '',
		area: '',
		hours: 0,
		start: fechaActual,
		end: fechaReferencia,
	});
	const [status, setStatus] = useState('');

	const newValue = (e) => {
		const { name, value } = e.target;
		setNewProject({
			...newProject,
			[name]: value,
		});
		setStatus('');
	};
	const newTime = (e) => {
		const { name, value } = e.target;
		setNewProject({
			...newProject,
			[name]: new Date(value).toISOString().split('T')[0],
		});
		setStatus('');
	};

	const { id } = useParams();

	const getBlogById = async () => {
		const res = await axios.get(url + id);
		const data = res.data.projects[0];
		setProject({
			name: data.name_project,
			area: data.area_project,
			hours: data.hours_estimation,
			start: data.start_date_project.split('T')[0],
			end: data.end_date_project.split('T')[0],
		});
		setNewProject({
			name: data.name_project,
			area: data.area_project,
			hours: data.hours_estimation,
			start: data.start_date_project.split('T')[0],
			end: data.end_date_project.split('T')[0],
		});
	};

	useEffect(() => {
		getBlogById();
	}, []);

	const updateProject = async (e) => {
		e.preventDefault();
    const response = await axios.patch(urlUpdate, {
      name_project: newProject.name,
      area_project: newProject.area,
      start_date_project: newProject.start,
      end_date_project: newProject.end,
      hours_estimation: newProject.hours,
      id_project: id,
    });
    setStatus(response.statusText);
    getBlogById();
	};

	return (
		<>
			<main className="main-home">
				<Sidebar></Sidebar>
				<section className="section-right">
					<Header></Header>
					<section className="edit-project-section">
						<div>
							<Link to="/admin/projects">
								<img src={BackIcon} alt="" />
							</Link>
							<p>Editar proyecto</p>
						</div>

						<form onSubmit={updateProject}>
							<label htmlFor="">Nombre del proyecto:</label>
							<span>{project.name}</span>
							<input
								type="text"
								name="name"
								value={newProject.name}
								onChange={newValue}
							/>

							<label htmlFor="">Área del proyecto:</label>
							<span> {project.area} </span>
							<input
								type="text"
								name="area"
								value={newProject.area}
								onChange={newValue}
							/>

							<label htmlFor="">Tiempo estimado</label>
							<div>
								<label htmlFor="">Inicio:</label>
								<span> {project.start}</span>
							</div>
							<input
								type="date"
								name="start"
								value={newProject.start}
								onChange={newTime}
							/>
							<div>
								<label htmlFor="">Fin:</label>
								<span> {project.end}</span>
							</div>
							<input
								type="date"
								name="end"
								value={newProject.end}
								onChange={newTime}
							/>

							<label htmlFor="">Horas estimadas:</label>
							<span>{project.hours}hs</span>
							<input
								type="number"
								name="hours"
								value={newProject.hours}
								onChange={newValue}
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
