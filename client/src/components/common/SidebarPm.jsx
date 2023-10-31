import '../../assets/css/Sidebar.css';
import { Link, useNavigate } from 'react-router-dom';
import LogoArbusta from '../../assets/icons/arbusta-icon.png';
import DashboardIcon from '../../assets/icons/dashboard-icon.svg';
import BagIcon from '../../assets/icons/bag-icon.svg';
import UsersIcon from '../../assets/icons/users-icon.svg';
import DownloadIcon from '../../assets/icons/bx-cloud-download.svg';
import EmployeeIcon from '../../assets/icons/employee-line.svg';
import { AuthContext } from '../../context/AuthContext';
import { useContext } from 'react';

export default function SidebarPm() {
	const { setUserData } = useContext(AuthContext);

	const navigate = useNavigate();

	const salir = () => {
		setUserData({});
		navigate('/');
	};

	return (
		<>
			<aside className="sidebar-left">
				<div className="logo">
					<img src={LogoArbusta} alt="Logo" />
					<p>ARBUSTA</p>
				</div>
				<nav className="nav">
					<Link to="/pm">
						<img src={DashboardIcon} alt="" />
						Dashboard
					</Link>
				</nav>
				<p>Proyectos</p>
				<nav className="nav">
					<Link to="/pm/projects">
						<img src={BagIcon} alt="" />
						Mis proyectos
					</Link>
				</nav>
				<p>Empleados</p>
				<nav className="nav">
					<Link to="/pm/employees">
						<img src={EmployeeIcon} alt="" />
						Empleados
					</Link>
					<Link to="/pm/pm-employees">
						<img src={UsersIcon} alt="" />
						Mis empleados
					</Link>
				</nav>
				<p>Descargas</p>
				<nav className="nav">
					<Link to="/pm/downloads">
						<img src={DownloadIcon} alt="" />
						Información
					</Link>
				</nav>
				<button onClick={salir}>Salir</button>
			</aside>
		</>
	);
}
