import { useEffect, useState } from 'react';
import '../../../assets/css/ShowEmployees.css'
import Header from '../../common/Header';
import SidebarPm from '../../common/SidebarPm';
import axios from 'axios';


/* Empleados */
const urlEmployees = 'http://localhost:3000/project/viewEmployeesInfo';
/* Empleados con y sin asignacion incluyendo bench */
const urlEmployeeAssingned = "http://localhost:3000/employees/assigned";
/* Empleados sin asignacion incluyendo bench */
const urlEmployeeNoAssigned = "http://localhost:3000/employees/noAssigned"

export default function ShowEmployees() {
	const [changeButton, setChangeButton] = useState(0);

	const [employeeData, setEmployeeData] = useState({
		employees: [],
		employeesAssigned: [],
		employeesNoAssigned: [],
	});

	const change = (e) => {
		setChangeButton(parseInt(e.target.value));
	};

	const getEmployees = async () => {
		const res = await axios.get(urlEmployees);
		const res2 = await axios.get(urlEmployeeAssingned);
		const res3 = await axios.get(urlEmployeeNoAssigned);

		const employees = res.data.data;
		const employeesAssigned = res2.data.data;
		const employeesNoAssigned = res3.data.data;

		setEmployeeData({
			...employeeData,
			employees,
			employeesAssigned,
			employeesNoAssigned,
		})


		console.log(typeof employeesNoAssigned[0].id_employee)

	};

	useEffect(() => {
		getEmployees();
	}, []);

	return (
		<>
			<main className="main-home">
				<SidebarPm></SidebarPm>
				<section className="section-right">
					<Header></Header>
					<section className="all-employees-info">
						<h2>Listado de empleados</h2>
						<div>
							<button onClick={change} value={0}>
								Empleados
							</button>
							<button onClick={change} value={1}>
								Empleados con y sin asignacion
							</button>
							<button onClick={change} value={2}>
								Empleados sin asignacion
							</button>
						</div>
						<section>
							{changeButton === 0
								? (
									employeeData.employees.map((e,index)=>(
										<div 
											className="table-employees-info" key={index}
											style={e.name_project === 'Bench' ? {border: '1px solid #c1448080'} : e.id_employee === 1 ? {display: 'none'}: {}}
										>
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
											<div>
												<h3>Nombre del proyecto</h3>
												<p>{e.name_project}</p>
											</div>
											<div>
												<h3>Project manager</h3>
												<p>{e.project_manager}</p>
											</div>
										</div>
									))
								)
								: changeButton === 1
								? (
									employeeData.employeesAssigned.map((e,index)=>(
										<div 
											className="table-employees-info" key={index}
											style={e.name_project === 'Bench' ? {border: '1px solid #c1448080'} : e.id_employee === 1 ? {display: 'none'} : e.role==='project manager' ? {display: 'none'} : {}}
										>
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
											<div>
												<h3>Nombre del proyecto</h3>
												<p>{e.name_project}</p>
											</div>
										</div>
									))
								)
								: changeButton === 2
								? (
									employeeData.employeesNoAssigned.map((e,index)=>(
										<div 
											className="table-employees-info" key={index}
											style={e.name_project === 'Bench' ? {border: '1px solid #c1448080'} : e.id_employee === 1 ? {display: 'none'} : e.role==='project manager' ? {display: 'none'} : {}}
										>
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
											<div>
												<h3>Nombre del proyecto</h3>
												<p>{e.name_project}</p>
											</div>
										</div>
									))
								)
								: ('')}
						</section>
						
					</section>
				</section>
			</main>
		</>
	);
}
