import Sidebar from '../../common/Sidebar';
import '../../../assets/css/CreateProject.css';
import BackIcon from '../../../assets/icons/back-icon.svg';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import Header from '../../common/Header';

const url = 'http://localhost:3000/createProject';

let fechaActual = new Date();

let fechaReferencia = new Date(fechaActual);
fechaReferencia.setMonth(fechaReferencia.getMonth() + 3);

fechaActual = fechaActual.toISOString().split('T')[0];
fechaReferencia = fechaReferencia.toISOString().split('T')[0];

export default function CreateProject() {
	const [project, setProject] = useState({
		name: '',
		area: '',
		hours: 0,
		start: fechaActual,
		end: fechaReferencia,
	});
	const [errorBack, setErrorBack] = useState([]);
	const [statusOk, setStatusOk] = useState('');

	const newValue = (e) => {
		const { name, value } = e.target;
		setProject({
			...project,
			[name]: value,
		});
		setErrorBack([]);
		setStatusOk('');
	};
	const newTime = (e) => {
		const { name, value } = e.target;
		setProject({
			...project,
			[name]: new Date(value).toISOString().split('T')[0],
		});
	};

	const createProject = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post(url, {
				name_project: project.name,
				area_project: project.area,
				start_date_project: project.start,
				end_date_project: project.end,
				hours_estimation: project.hours,
				id_user_admin: 1,
			});

			setProject({
				name: '',
				area: '',
				hours: 0,
				start: fechaActual,
				end: fechaReferencia,
			});
			setErrorBack([]);
			setStatusOk(response.statusText);
		} catch (error) {
			setStatusOk('');
			let err = error.response.data.error;
			setErrorBack(err);
		}
	};

	return (
		<>
			<main className="main-home">
				<Sidebar></Sidebar>
				<section className="section-right">
					<Header></Header>
					<section className="create-projects-section">
						<div>
							<Link to="/admin/projects">
								<img src={BackIcon} alt="" />
							</Link>
							<p>Crear proyecto</p>
						</div>

						<form onSubmit={createProject}>
							<label htmlFor="">Nombre del proyecto</label>
							<input
								type="text"
								name="name"
								value={project.name}
								onChange={newValue}
							/>
							{errorBack
								? errorBack.map((e, index) =>
										e.path === 'name_project' ? (
											<span className="errorCreate" key={index}>
												{e.msg}
											</span>
										) : (
											''
										)
								  )
								: ''}

							<label htmlFor="">Área del proyecto</label>
							<input
								type="text"
								name="area"
								value={project.area}
								onChange={newValue}
							/>
							{errorBack
								? errorBack.map((e, index) =>
										e.path === 'area_project' ? (
											<span className="errorCreate" key={index}>
												{e.msg}
											</span>
										) : (
											''
										)
								  )
								: ''}

							<label htmlFor="">Tiempo estimado</label>
							<label htmlFor="">
								Inicio:
								<input
									type="date"
									name="start"
									value={project.start}
									onChange={newTime}
								/>
							</label>
							<label htmlFor="">
								Fin:
								<input
									type="date"
									name="end"
									value={project.end}
									onChange={newTime}
								/>
							</label>

							<label htmlFor="">Horas estimadas</label>
							<input
								type="number"
								name="hours"
								value={project.hours}
								onChange={newValue}
							/>
							{errorBack
								? errorBack.map((e, index) =>
										e.path === 'hours_estimation' ? (
											<span className="errorCreate" key={index}>
												{e.msg}
											</span>
										) : (
											''
										)
								  )
								: ''}

							{statusOk === 'OK' ? (
								<span className="createSucces">Proyecto creado con éxito</span>
							) : (
								''
							)}
							<button type="submit">Crear Proyecto</button>
						</form>
					</section>
				</section>
			</main>
		</>
	);
}
