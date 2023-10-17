import axios from "axios";
import Header from "../../common/Header";
import Sidebar from "../../common/Sidebar";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const url = 'http://localhost:3000/users/getUsersInfo';


export default function ShowUsers() {

    const [users, setUsers] = useState([]);

    const getUsers = async () => {
        const data= await axios.get(url);
        const users = data.data.users;
        setUsers(users)
    }
    
    useEffect(() => {
        getUsers()
    },[])

    return(
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
                        {
                            users.map((users,index)=> (
                                <section className="table" key={index}>
                                    <div>
                                        <h3>Nombre de usuario</h3>
                                        <p>
                                            {users.username}
                                        </p>
                                    </div>
                                    <div>
                                        <h3>Mail del usuario</h3>
                                        <p>
                                            {users.mail}
                                        </p>
                                    </div>
                                    <div>
                                        <h3>Tipo de permiso</h3>
                                        <p>
                                            {users.permission}
                                        </p>
                                    </div>
                                </section>
                            ))
                        }
                    </section>
                </section>
            </main>
        </>
    )
}