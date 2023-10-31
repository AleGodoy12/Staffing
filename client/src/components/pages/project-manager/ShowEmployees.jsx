import { useEffect, useState } from 'react';
import '../../../assets/css/Home.css';
import Header from '../../common/Header';
import SidebarPm from '../../common/SidebarPm';
import axios from 'axios';

const urlEmployees = 'http://localhost:3000/project/viewEmployeesInfo';

export default function ShowEmployees() {
	const [changeButton, setChangeButton] = useState(0);
	const [employeeData, setEmployeeData] = useState({
		employees: [],
	});

	const change = (e) => {
		setChangeButton(parseInt(e.target.value));
	};

	const getEmployee = async () => {
		const res = await axios.get(urlEmployees);
		console.log(res);
	};

	useEffect(() => {
		getEmployee();
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
								? 'cero'
								: changeButton === 1
								? 'uno'
								: changeButton === 2
								? 'dos'
								: ''}
						</section>
					</section>
				</section>
			</main>
		</>
	);
}
