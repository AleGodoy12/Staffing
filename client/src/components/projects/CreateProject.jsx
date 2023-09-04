import Sidebar from '../Sidebar';
import '../../assets/css/CreateProject.css';
import BackIcon from '../../assets/icons/back-icon.svg'
import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import Header from '../Header';



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
  const [errorBack, setErrorBack] = useState([])
  const [statusOk, setStatusOk] = useState('')

  const newName = (event) => {
    setProjectName(event.target.value)
    setErrorBack([])
    setStatusOk('')
  }
  
  const newAreaName = (event) => {
    setProjectArea(event.target.value)
    setErrorBack([])
    setStatusOk('')
  }
  
  const newHours = (event) => {
    setProjectHours(event.target.value)
    setErrorBack([])
    setStatusOk('')
  }

  

  const startDate = (event) => {
    setProjectStart(new Date(event.target.value).toISOString().split('T')[0]);
	};
  
	const endDate = (event) => {
    setProjectEnd(new Date(event.target.value).toISOString().split('T')[0]);
	};


  const createProject = async (e) => {
		e.preventDefault();
		try {
      const response = await axios.post(url, {
				name_project: projectName,
				area_project: projectArea,
				start_date_project: projectStart,
				end_date_project: projectEnd,
				hours_estimation: projectHours,
				id_user_admin: 1,
      });

      setProjectName('')
      setProjectArea('')
      setProjectStart(fechaActual)
      setProjectEnd(fechaReferencia)
      setProjectHours(0)
      setErrorBack([])
      setStatusOk(response.statusText)

    } catch (error) {
      setStatusOk('');
      let err = error.response.data.error;
      setErrorBack(err)
      console.log(err)
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
							<Link to="/panel/projects">
								<img src={BackIcon} alt="" />
							</Link>
						</div>
						<form onSubmit={createProject}>
							<label htmlFor="">Nombre del proyecto</label>

              <input type="text" value={projectName} onChange={newName} />
              {errorBack ? errorBack.map((e, index) => e.path === 'name_project' ? <span className='errorCreate' key={index}>{e.msg}</span> : '') : ''}

							<label htmlFor="">Área del proyecto</label>

							<input type="text" value={projectArea} onChange={newAreaName} />
						{errorBack ? errorBack.map((e, index) => e.path === 'area_project' ? <span className='errorCreate' key={index}>{e.msg}</span> : '')	: ''}

							<label htmlFor="">Tiempo estimado</label>

							<label htmlFor="">
								Inicio:
								<input type="date" value={projectStart} onChange={startDate} />
							</label>

							<label htmlFor="">
								Fin:
								<input type="date" value={projectEnd} onChange={endDate} />
							</label>

							<label htmlFor="">Horas estimadas</label>

							<input type="number" value={projectHours} onChange={newHours} />
              {errorBack ? errorBack.map((e, index) => e.path === 'hours_estimation' ? <span className='errorCreate' key={index}>{e.msg}</span> : '') : ''}
              
              {statusOk === 'OK' ? <span className='createSucces'>Proyecto creado con éxito</span> : ""}
							<button type="submit">Crear Proyecto</button>
						</form>

            
					</section>
				</section>
			</main>
		</>
	);
}
