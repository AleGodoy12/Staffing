import { useContext, useEffect, useState } from 'react';
import '../../../assets/css/Home.css';
import Header from '../../common/Header';
import SidebarPm from '../../common/SidebarPm';
import axios from 'axios';
import { AuthContext } from '../../../context/AuthContext';
import '../../../assets/css/ShowPmEmployees.css'

const urlProject = 'http://localhost:3000/users/getProjectManagerInfo/';


export default function ShowPmEmployees() {
	const { userData } = useContext(AuthContext);
	const idUser = userData.id_user;

	const [employeesData, setEmployeesData] = useState([]);

	const getEmployeeData = async () => {
		const res = await axios.get(urlProject + idUser);
		const employees = res.data.data[2];

		setEmployeesData(employees)

	};
	
	useEffect(()=> {
		getEmployeeData()
	}, [])


	return (
		<>
			<main className="main-home">
				<SidebarPm></SidebarPm>
				<section className="section-right">
					<Header></Header>
					<section className='all-pm-employees-info'>
						<h2>Listado de sus empleados</h2>
						{employeesData.length === 0 ? (
								<h3>Usted no tiene empleados asignados a sus proyectos</h3>
							) : (
								employeesData.map((e, index) => (
									<div className="table-employee-info" key={index}>
										<div>
											<h3>Nombre</h3>
											<p>{e.name}</p>
										</div>
										<div>
											<h3>Apellido</h3>
											<p>{e.lastname}</p>
										</div>
										<div>
											<h3>Mail</h3>
											<p>{e.mail}</p>
										</div>
										<div>
											<h3>Rol</h3>
											<p>{e.role}</p>
										</div>
										<div>
											<h3>Compañía</h3>
											<p>{e.company}</p>
										</div>
										<div>
											<h3>Disponibilidad</h3>
											<p>Horas usadas: {e.used_hours}hs</p>
											<p>Horas disponibles: {e.free_hours}hs</p>
											<p>Horas totales: {e.total_hours}hs</p>
										</div>
									</div>
								))
							)}
					</section>
				</section>
			</main>
		</>
	);
}
