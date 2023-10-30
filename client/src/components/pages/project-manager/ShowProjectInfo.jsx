import { Link, useParams } from 'react-router-dom';
import Header from '../../common/Header';
import SidebarPm from '../../common/SidebarPm';
import BackIcon from '../../../assets/icons/back-icon.svg';
import '../../../assets/css/ShowProjectInfo.css'
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import axios from 'axios';

const urlProject = 'http://localhost:3000/users/getProjectManagerInfo/';

export default function ShowProjectInfo() {


  const { userData } = useContext(AuthContext);

  const { id } = useParams();

  const [projectData, setProjectData] = useState({
    project: [],
    leader: [],
    employees: []
  });

	const idUser = userData.id_user;

	const getProjectData = async () => {
		const res = await axios.get(urlProject + idUser);
    const data = res.data.data;
    
    let project = data[0].filter((project) => project.id_project === parseInt(id));
    let leader = data[1]
    let employees = data[2].filter((employee)=> employee.id_project === parseInt(id))
    
    console.log(project, "datos del proyecto")
    console.log(leader, "datos del lider del proyecto")
    console.log(employees, "empleados del proyecto seleccionado")

		setProjectData();
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
            <section>

            </section>
					</section>
				</section>
			</main>
		</>
	);
}
