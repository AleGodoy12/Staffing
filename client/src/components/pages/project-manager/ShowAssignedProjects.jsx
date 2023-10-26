import axios from 'axios';
import '../../../assets/css/ShowAssignedProjects.css'
import Header from '../../common/Header'
import SidebarPm from '../../common/SidebarPm'
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../context/AuthContext';


const urlProject = 'http://localhost:3000/users/getProjectManagerInfo/';

export default function ShowAssignedProjects() {

  const { userData } = useContext(AuthContext);

  const [projectData, setProjectData] = useState([]);

  const idUser = userData.id_user;

  const getProjectData = async () => {
    const res = await axios.get(urlProject + idUser);
    const project = res.data.data[0]
    console.log(project)
    setProjectData(project);
  
  }

  useEffect(() => {
    getProjectData()
  }, [])


  return (
		<>
			<main className="main-home">
				<SidebarPm></SidebarPm>
				<section className="section-right">
					<Header></Header>
					<section className="projects-assignment-pm">
						{projectData.map((project, index) => (
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
									<p>{project.assigned_hours}</p>
								</div>
								<div>
									<h3>Horas totales</h3>
									<p>{project.hours_estimation}</p>
                </div>
                <div>
                  <button>Ver</button>
                </div>
							</section>
						))}
					</section>
				</section>
			</main>
		</>
	);
}