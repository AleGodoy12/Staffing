import '../assets/css/Sidebar.css'
import { Link } from 'react-router-dom';
import LogoArbusta from '../assets/icons/arbusta-icon.png';
import DashboardIcon from '../assets/icons/dashboard-icon.svg'
import BagIcon from '../assets/icons/bag-icon.svg'
import UserIcon from '../assets/icons/user-icon.svg'
import UsersIcon from '../assets/icons/users-icon.svg'

export default function Sidebar() {
  return (
    <>
      <aside className='sidebar-left'>
        <div className="logo">
          <img src={ LogoArbusta } alt="Logo" />
          <p>ARBUSTA</p>
        </div>
        <nav className='nav'>
          <Link to="/panel">
            <img src={DashboardIcon} alt="" />
            Dashboard
          </Link>
        </nav>
        <p>Proyectos</p>
        <nav className='nav'>
          <Link to="/panel/employee">
            <img src={ UsersIcon} alt="" />
            Asignar Empleados
          </Link>
          <Link to="/panel/projects">
            <img src={BagIcon} alt="" />
            Administrar Proyectos
          </Link>
        </nav>
        <p>Usuarios</p>
        <nav className='nav'>
          <a href="#">
            <img src={UserIcon } alt="" />
            Administrar usuarios
          </a>
        </nav>
        <Link to="/">
          Salir
        </Link>
      </aside>
    </>
  )
}