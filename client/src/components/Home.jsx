import Sidebar from "./Sidebar"
import '../assets/css/Home.css'
import BellIcon from '../assets/icons/bell-icon.svg' 
import ProfileIcon from '../assets/icons/profile-icon.svg' 
import SearchIcon from '../assets/icons/search-icon.svg' 
import DropDownIcon from '../assets/icons/arrow-drop-down-line-icon.svg' 


export default function Home() {
  /* Creo un estado con los 4 links, ese estado lo cambio desde home, le puedo pasar como una prop la funcion del setState,  */
  return (
    <>
      <main className="main-home">
        <Sidebar></Sidebar>
        <section className="section-right">
          <div>
            <h1>Panel de proyectos</h1>
            <p>Version 1.0.0</p>
          </div>
          <div>
            <img src={SearchIcon} alt="" />
            <img src={BellIcon} alt="" />
            <img src={ProfileIcon} alt="" />
            <img src={DropDownIcon} alt="" />
          </div>
        </section>
      </main>
    </>
  )
}