import Sidebar from '../Sidebar';
import '../../assets/css/AssignmentProject.css';
import Header from '../Header';
import BackIcon from '../../assets/icons/back-icon.svg';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';


/* Llamo al endpoint del proyecto */
const url = 'http://localhost:3000/';
/* Llamo al endpoint del proyecto que me trae empleados libres */
const urlEmployee = 'http://localhost:3000/project/viewFreeEmployes';
/* Llamo al endpoint del proyecto que me trae empleados asignados al proyecto  */
const urlEmployeeFromProject = 'http://localhost:3000/project/showEmployees';

export default function AssignmentProject() {
  const [projectName, setProjectName] = useState('');
	const [projectArea, setProjectArea] = useState('');
	const [projectStart, setProjectStart] = useState('');
	const [projectEnd, setProjectEnd] = useState('');
  const [projectHours, setProjectHours] = useState(0);
  /* empleados */
  const [employee, setEmployee] = useState([])

  /* Obtener datos del proyecto */
  const { id } = useParams()
  
  const getProjectById = async () => {
    const res = await axios.get(url + id);
    const data = res.data.projects[0];
    console.log(data);
    setProjectName(data.name_project);
		setProjectArea(data.area_project);
		setProjectStart(data.start_date_project.split('T')[0]);
		setProjectEnd(data.end_date_project.split('T')[0]);
		setProjectHours(data.hours_estimation);
  }

  const getFreeEmployees = async () => {
    const res = await axios.get(urlEmployee);
    const data = res.data.data;
    setEmployee(data);
    console.log(data);
  }

  
  const viewEmployeeFromSelectedProject = async () => {
    const res = await axios.get(urlEmployeeFromProject, {
      params: { id }
    })
    console.log(res);
  }

  useEffect(() => {
    getProjectById();
    getFreeEmployees();
    viewEmployeeFromSelectedProject();
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
								<div className="texto">
									<p>
										Nombre del proyecto: <span>{projectName} </span>
									</p>
									<p>
										Área del proyecto: <span>{projectArea} </span>
									</p>
									<p>
										Tiempo estimado:
										<span>Inicio: {projectStart}</span>
										<span>Fin: {projectEnd}</span>
									</p>
								</div>
								<div className="bar">
									<h2>
										Horas del proyecto: <span>{projectHours}hs</span>
									</h2>
									<p>Horas asignadas:</p>
									<progress max="100" value="70"> </progress>
								</div>
							</div>
              <div>
                <p>Staff Seleccionado</p>
              </div>
            </section>
            <section className="employee">
              {employee.map((e,index) => (
                <div className="card" key={index} style={{border: "1px solid black"}}>
                  <h1>{e.name} {e.lastname }</h1>
                  <p>Horas Disponibles: {e.free_hours }</p>
                  <p>Horas Usadas: {e.used_hours} </p>
                  <p>Horas Totales: {e.total_hours }</p>
                </div>
              )) }

            </section>
					</section>
				</section>
			</main>
		</>
	);
}
