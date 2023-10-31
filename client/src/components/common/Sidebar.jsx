import '../../assets/css/Sidebar.css';
import { Link, useNavigate } from 'react-router-dom';
import LogoArbusta from '../../assets/icons/arbusta-icon.png';
import DashboardIcon from '../../assets/icons/dashboard-icon.svg';
import BagIcon from '../../assets/icons/bag-icon.svg';
import UserIcon from '../../assets/icons/user-icon.svg';
import UsersIcon from '../../assets/icons/users-icon.svg';
import { AuthContext } from '../../context/AuthContext';
import { useContext } from 'react';

export default function Sidebar() {
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
					<Link to="/admin">
						<img src={DashboardIcon} alt="" />
						Dashboard
					</Link>
				</nav>
				<p>Proyectos</p>
				<nav className="nav">
					<Link to="/admin/assignment">
						<img src={UsersIcon} alt="" />
						Asignar Empleados
					</Link>
					<Link to="/admin/projects">
						<img src={BagIcon} alt="" />
						Administrar Proyectos
					</Link>
				</nav>
				<p>Usuarios</p>
				<nav className="nav">
					<Link to="/admin/users">
						<img src={UserIcon} alt="" />
						Administrar usuarios
					</Link>
				</nav>
				<button onClick={salir}>Salir</button>
			</aside>
		</>
	);
}
