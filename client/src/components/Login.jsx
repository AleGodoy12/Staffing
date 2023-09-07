import LogoArbusta from '../assets/icons/arbusta-icon.png'
import '../assets/css/Login.css'
import axios from 'axios'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

/* Llamo al endpoint del login */
const url = 'http://localhost:3000/login';

export default function Login() {

  const navigate = useNavigate();

  const [data, setData] = useState({
    username: 'admin',
    password:'12345678'
  })
  const [errorMessageFrontU, setErrorMessageFrontU] = useState('');
  const [errorMessageFrontP, setErrorMessageFrontP] = useState('');
  const [errorMessageBack, setErrorMessageBack] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value
    })
    setErrorMessageFrontU('');
    setErrorMessageFrontP('');
    setErrorMessageBack('');
  }
  
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      /* Validaciones del front */
      
      if (data.username.length < 3 && data.username !== '') {
        setErrorMessageFrontU('El usuario no puede tener menos de 3 caracteres');
      } else if (data.username.length > 15 && data.username !== '') {
        setErrorMessageFrontU('El usuario no puede tener más de 15 caracteres');
      }
      if (data.password.length < 8 && data.password !== '') {
        setErrorMessageFrontP('La contraseña no puede tener menos de 8 caracteres');
      } else if (data.password.length > 15 && data.password !== '') {
        setErrorMessageFrontP('La contraseña no puede tener más de 15 caracteres');
      }

      if (errorMessageFrontP !== '' || errorMessageFrontU !== '') {
        return;
      }

      const response = await axios.post(url, {
        username: data.username,
        password: data.password,
      });
      
      navigate('/panel');
    } catch (error) {
      const errorResponse = error.response.data.errorDetail;
      setErrorMessageBack(errorResponse);
    }
  };

  return (
    <>
      <main className="main-login">
        <section className="login">
          <div className="container">
            <div className="logo">
              <img src={LogoArbusta} alt="logo" />
              <p>ARBUSTA</p>
            </div>
            <p> Una nueva forma de gestionar nuestros equipos y proyectos</p>
            <h1>Inicio de sesión</h1>
            <form action="#">
              <label htmlFor="user">Usuario: <span>{ errorMessageFrontU }</span></label>
              <input
                style={errorMessageFrontU !== '' ? {borderColor:"red"} : {borderColor:"#afa2c3"}}
                type="text"
                name="username"
                value={data.username}
                onChange={handleChange}
                id="user"
              />
              <label htmlFor="password">Contraseña: <span>{ errorMessageFrontP }</span> </label>
              <input
                style={errorMessageFrontP !== '' ? {borderColor:"red"} : {borderColor:"#afa2c3"}}
                type="password"
                name="password"
                id="password"
                value={data.password}
                onChange={handleChange}
              />
              <button onClick={handleLogin}>Iniciar sesión</button>
            </form>
            <span>{ errorMessageBack }</span>
          </div>
        </section>
      </main>
    </>
  );
}