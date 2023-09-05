import Sidebar from '../Sidebar';
import '../../assets/css/ShowProjectsA.css';
import Header from '../Header';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';


/* Llamo al endpoint del proyecto */
const url = 'http://localhost:3000/';

export default function ShowProjectsA() {

  const [projects, setProjects] = useState([]);

	//procedimiento que trae todos los proyectos
	const getProjects = async () => {
		const res = await axios.get(url);
		setProjects(res.data.projects);
		return;
	};

	useEffect(() => {
		getProjects();
	}, []);


	return (
		<>
			<main className="main-home">
				<Sidebar></Sidebar>
				<section className="section-right">
					<Header></Header>
					<section className="projects-assignment">
						<div>
							<h2>Asignar Empleados</h2>
							<Link>Proyectos activos sin asignacion</Link>
							<Link>Proyectos activos con asignacion</Link>
						</div>
						<section>
							{projects.map((e, index) => (
								<div key={index} className="card">
									<h2>{e.name_project}</h2>
									<div>
										<p>{e.area_project}</p>
										<p>Inicio: {e.start_date_project.split('T')[0]} </p>
										<p>Fin: {e.end_date_project.split('T')[0]}</p>
                  </div>
                  <Link to={`/panel/assignment/${e.id_project}`}>Asignar</Link>
								</div>
							))}
						</section>
					</section>
				</section>
			</main>
		</>
	);
}
