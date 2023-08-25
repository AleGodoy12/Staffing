import Sidebar from './Sidebar';
import '../assets/css/CreateProject.css';
import BackIcon from '../assets/icons/back-icon.svg'
import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import Header from './Header';



/* Llamo al endpoint del proyecto */
const url = 'http://localhost:3000/createProject';

let fechaActual = new Date();

let fechaReferencia = new Date(fechaActual);
fechaReferencia.setMonth(fechaReferencia.getMonth() + 3);

/* Formateo YYYY-MM-DD */
fechaActual = fechaActual.toISOString().split('T')[0];
fechaReferencia = fechaReferencia.toISOString().split('T')[0];

export default function CreateProject() {

  const [projectName, setProjectName] = useState('')
  const [projectArea, setProjectArea] = useState('')
  const [projectStart, setProjectStart] = useState(fechaActual)
  const [projectEnd, setProjectEnd] = useState(fechaReferencia)
  const [projectHours, setProjectHours] = useState(0)

  const newName = (event) => {
    setProjectName(event.target.value)
  }
  
  const newAreaName = (event) => {
    setProjectArea(event.target.value)
  }
  
  const newHours = (event) => {
    setProjectHours(event.target.value)
  }

  

  const startDate = (event) => {
    setProjectStart(new Date(event.target.value).toISOString().split('T')[0]);
	};
  
	const endDate = (event) => {
    setProjectEnd(new Date(event.target.value).toISOString().split('T')[0]);
	};


  const createProject = async (e) => {
		e.preventDefault();
		await axios.post(url, {
			name_project: projectName,
			area_project: projectArea,
			start_date_project: projectStart,
			end_date_project: projectEnd,
      hours_estimation: projectHours,
      id_user_admin: 2,
		});
	};


	return (
		<>
			<main className="main-home">
				<Sidebar></Sidebar>
				<section className="section-right">
					<Header></Header>
					<section className="create-projects-section">
						<div>
							<Link to="/panel/projects">
								<img src={BackIcon} alt="" />
							</Link>
						</div>
						<form onSubmit={createProject}>
							<label htmlFor="">Nombre del proyecto</label>
							<br />
							<input type="text" value={projectName} onChange={newName} />
              <br />
              
							<label htmlFor="">Área del proyecto</label>
							<br />
							<input type="text" value={projectArea} onChange={newAreaName} />
							<br />

							<label htmlFor="">Tiempo estimado</label>
							<br />
							<label htmlFor="">Inicio</label>
							<input type="date" value={projectStart} onChange={startDate} />
							<br />

							<label htmlFor="">Fin</label>
							<input type="date" value={projectEnd} onChange={endDate} />
							<br />

							<label htmlFor="">Horas estimadas</label>
							<br />
							<input type="number" value={projectHours} onChange={newHours} />
							<br />

							<button type='submit'>Crear Proyecto</button>
						</form>
					</section>
				</section>
			</main>
		</>
	);
}
