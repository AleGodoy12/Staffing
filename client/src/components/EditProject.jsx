import Sidebar from "./Sidebar"
import '../assets/css/EditProject.css'
import Header from "./Header"
import BackIcon from "../assets/icons/back-icon.svg"
import { Link } from "react-router-dom"
import { useState } from "react"


export default function EditProject() {
  const [newProjectName, setNewProjectName] = useState('')
  const [newProjectArea, setNewProjectArea] = useState('')
  const [newProjectStart, setNewProjectStart] = useState()
  const [newProjectEnd, setNewProjectEnd] = useState()
  const [newProjectHours, setNewProjectHours] = useState()



  return (
		<>
			<main className="main-home">
				<Sidebar></Sidebar>
				<section className="section-right">
					<Header></Header>
					<section className="edit-project-section">
						<div>
							<Link to="/panel/projects">
								<img src={BackIcon} alt="" />
							</Link>
						</div>
						<form >
							<label htmlFor="">Nombre del proyecto</label>
							<br />
							<input type="text" value={newProjectName} />
							<br />

							<label htmlFor="">Área del proyecto</label>
							<br />
							<input type="text" value={newProjectArea} />
							<br />

							<label htmlFor="">Tiempo estimado</label>
							<br />
							<label htmlFor="">Inicio</label>
							<input type="date" value={newProjectStart} />
							<br />

							<label htmlFor="">Fin</label>
							<input type="date" value={newProjectEnd}  />
							<br />

							<label htmlFor="">Horas estimadas</label>
							<br />
							<input type="number" value={newProjectHours} />
							<br />

							<button type="submit">Crear Proyecto</button>
						</form>
					</section>
				</section>
			</main>
		</>
	);
}