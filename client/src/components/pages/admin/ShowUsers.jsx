import axios from 'axios';
import Header from '../../common/Header';
import Sidebar from '../../common/Sidebar';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from '../../common/Modal';
import '../../../assets/css/ShowUsers.css'


const url = 'http://localhost:3000/users/getUsersInfo';
const urlDeleteUser = 'http://localhost:3000/users/deleteUser/';

export default function ShowUsers() {
	const [users, setUsers] = useState([]);

	const getUsers = async () => {
		const data = await axios.get(url);
		const usersData = data.data.users;
		console.log(usersData[0].id_user);
		setUsers(usersData);
	};

	useEffect(() => {
		getUsers();
  }, []);
  
  const deleteUser = async (id) => {
    await axios.delete(`${urlDeleteUser}${id}`);
    getUsers()
  }

	return (
		<>
			<main className="main-home">
				<Sidebar></Sidebar>
				<section className="section-right">
					<Header></Header>
					<section className="users-section">
						<div>
							<Link to="/admin/users/create">Crear Usuario</Link>
							<h3>Lista de usuarios disponibles</h3>
						</div>
						{users.map((user, index) =>
							user.id_user === 1 ? (
								''
							) : (
								<section className="table" key={index}>
									<div>
										<h3>Nombre de usuario</h3>
										<p>{user.username}</p>
									</div>
									<div>
										<h3>Mail del usuario</h3>
										<p>{user.mail}</p>
									</div>
									<div>
										<h3>Tipo de permiso</h3>
										<p>{user.permission}</p>
									</div>
									<div>
                    <Modal
                      type={'danger'}
                      action={'Confirmar eliminación de usuario'}
                      question={`¿Está seguro que desea eliminar al usuario ${user.username}?`}
                      msg={'Esta acción es irreversible'}
											buttonText={'Eliminar usuario'}
											execute={() => deleteUser(user.id_employee)}
										></Modal>
									</div>
								</section>
							)
						)}
					</section>
				</section>
			</main>
		</>
	);
}
