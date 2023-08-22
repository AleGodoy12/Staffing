import LogoArbusta from '../assets/icons/arbusta-icon.png'
import '../assets/css/Login.css'
import axios from 'axios'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

/* Llamo al endpoint del login */
const url = 'http://localhost:3000/login';

export default function Login() {

  const navigate = useNavigate();

  const [username, setUsername] = useState('admin')
  const [password, setPassword] = useState('12345678')
  const [errorMessageFrontU, setErrorMessageFrontU] = useState('');
  const [errorMessageFrontP, setErrorMessageFrontP] = useState('');
  const [errorMessageBack, setErrorMessageBack] = useState('')

	/* Actualizo el estado del nombre y de la contraseña */
  const handleUsernameChange = (event) => {
    setErrorMessageFrontU('');
		setErrorMessageFrontP('');
		setErrorMessageBack('');
    document.querySelector('input[name=username]').style.borderColor = "#afa2c3";
		setUsername(event.target.value); 
	}
  const handlePasswordChange = (event) => {
    setErrorMessageFrontU('');
		setErrorMessageFrontP('');
		setErrorMessageBack('');
    document.querySelector('input[name=password]').style.borderColor = "#afa2c3";
    setPassword(event.target.value);
  }
  
  
  
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      /* Validaciones del front */
      
      if (username.length < 3) {
        setErrorMessageFrontU('El usuario no puede tener menos de 3 caracteres');
        document.querySelector('input[name=username]').style.borderColor = "red";
      } else if (username.length > 15) {
        setErrorMessageFrontU('El usuario no puede tener más de 15 caracteres');
        document.querySelector('input[name=username]').style.borderColor = "red";
      }
      if (password.length < 8) {
        setErrorMessageFrontP('La contraseña no puede tener menos de 8 caracteres');
        document.querySelector('input[name=password]').style.borderColor = "red";
      } else if (password.length > 15) {
        setErrorMessageFrontP('La contraseña no puede tener más de 15 caracteres')
        document.querySelector('input[name=password]').style.borderColor = "red";
      }


      if (errorMessageFrontP !== '' || errorMessageFrontU !== '') {
        return;
      }

      const response = await axios.post(url, {
        username,
				password,
      });
      /* console.log(response) */
      navigate('/panel');

    } catch (error) {
      
      console.log('hola')
      setErrorMessageBack(error.response.data.errorDetail);
      /* console.log(error.response.data.errorDetail) */
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
								type="text"
								name="username"
								value={username}
								onChange={handleUsernameChange}
								id="user"
							/>

              <label htmlFor="password">Contraseña: <span>{ errorMessageFrontP }</span> </label>
							<input
								type="password"
								name="password"
								id="password"
								value={password}
								onChange={handlePasswordChange}
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