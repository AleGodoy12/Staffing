import { useEffect, useState } from "react";
import Header from "../../common/Header";
import Sidebar from "../../common/Sidebar";
import { Link } from "react-router-dom";
import BackIcon from '../../../assets/icons/back-icon.svg';
import '../../../assets/css/CreateUser.css'
import axios from 'axios';

const url = 'http://localhost:3000/users/getProjectManagersInfo';
const urlPost = 'http://localhost:3000/users/createUser';


export default function CreateUsers() {

  const [pm, setPm] = useState([])
  const [statusOk, setStatusOk] = useState('');
  const [user, setUser] = useState({
    idUser: 0,
    username: "",
    email: "",
    role: "",
    password: ""
  })
  

  const onChangeSelect = (e) => {
    const idUser = parseInt(e.target.value);
    const datos = pm.filter((e) => e.id_employee === idUser)
    setUser({
			...user,
			idUser: datos[0].id_employee,
			username: datos[0].name,
			email: datos[0].mail,
			role: datos[0].role,
    });
    setStatusOk('');
  }

  const newValue = (e) => {
    const { name, value } = e.target;
    setUser({
			...user,
			[name]: value,
		});
  }

  const getPm = async () => {
    const data = await axios.get(url);
    const projectManagers = data.data.projectManagers; 
    setPm(projectManagers)
  }

  useEffect(() => {
    getPm()
  },[])

  const createUser = async (e) => {
    e.preventDefault()
    try {
			const response = await axios.post(urlPost, {
        username: user.username,
        id_employee: user.idUser,
        mail: user.email,
        password: user.password,
        permission: user.role,
			});

      setUser({
				idUser: 0,
				username: '',
				email: '',
				role: '',
				password: '',
      });
      
      setStatusOk(response.data.data);

      getPm()
		} catch (error) {
			console.log(error)	
		}
  }

    return (
			<>
				<main className="main-home">
					<Sidebar></Sidebar>
					<section className="section-right">
						<Header></Header>
						<section className="create-user-section">
							<div>
								<Link to="/admin/users/">
									<img src={BackIcon} alt="" />
								</Link>
								<p>Crear usuario</p>
              </div>
              <h2>Seleccionar empleado</h2>
              <select onChange={onChangeSelect}>
                <option> Seleccionar </option>
                {
                  pm.map((e) => (
                    <option key={e.id_employee} value={e.id_employee}>{e.name} {e.lastname }</option>
                  ))
                }
              </select>

              <form onSubmit={createUser}>

                <input
                  name="idUser"
                  type="number"
                  disabled
                  value={user.idUser}
                />

                <label htmlFor="">Nombre del usuario</label>
                <input
                  name="username"
                  type="text"
                  disabled
                  value={user.username}
                />

                <label htmlFor="">Mail del usuario</label>
                <input
                  name="email"
                  type="text"
                  disabled
                  value={user.email}
                />
                
                <label htmlFor="">Rol del usuario</label>
                <input
                  name="role"
                  type="text"
                  disabled
                  value={user.role}
                />

                <label htmlFor="">Crear contraseña</label>
                <input
                  name="password"
                  type="password"
                  value={user.password}
                  onChange={newValue}
                />

                <button type="submit">Crear usuario</button>
                
              </form>
              
              <p>{ statusOk }</p>
						</section>
					</section>
				</main>
			</>
		);
}