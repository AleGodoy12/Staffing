import LogoArbusta from '../assets/icons/arbusta-icon.png'
import '../assets/css/Login.css'
import axios from 'axios'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

/* Llamo al endpoint del login */
const url = 'http://localhost:3000/login';

export default function Login() {

  const navigate = useNavigate();


  const [err, setErr] = useState({
    back: '',
    frontUser: '',
    frontPassword: ''
  })
  const [data, setData] = useState({
    username: 'admin',
    password:'12345678'
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value
    })
    setErr({
      back: '',
      frontUser: '',
      frontPassword: ''
    })
  }
  
  
  
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      /* Validaciones del front */
      
      if (data.username.length < 3 && data.username !== '') {
        setErr({
					...err,
					frontUser: 'El usuario no puede tener menos de 3 caracteres',
				});
        document.querySelector('input[name=username]').style.borderColor = "red";
      } else if (data.username.length > 15 && data.username !== '') {
        setErr({
					...err,
					frontUser: 'El usuario no puede tener más de 15 caracteres',
				});
				document.querySelector('input[name=username]').style.borderColor =
					'red';
			}
      if (data.password.length < 8 && data.password !== '') {
        setErr({
					...err,
					frontPassword: 'La contraseña no puede tener menos de 8 caracteres',
				});
				document.querySelector('input[name=password]').style.borderColor =
					'red';
			} else if (data.password.length > 15 && data.password !== '') {
        setErr({
          ...err,
          frontPassword:'La contraseña no puede tener más de 15 caracteres'
        })
				document.querySelector('input[name=password]').style.borderColor =
					'red';
			}


      if (err.frontPassword !== '' || err.frontUser !== '') {
        return;
      }
      
      console.log(data.username)
      console.log(data.password)
      const response = await axios.post(url, {
        username: data.username,
				password: data.password,
      });
      console.log(response);
      
      navigate('/panel');

    } catch (error) {
      console.log(error)
      let errorResponse = error.response.data.errorDetail;
      console.log(errorResponse)
      setErr({
        back: errorResponse,
        ...err,
      });
      
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
              <label htmlFor="user">Usuario: <span>{ err.frontUser }</span></label>
							<input
								type="text"
								name="username"
								value={data.username}
								onChange={handleChange}
								id="user"
							/>
              <label htmlFor="password">Contraseña: <span>{ err.frontPassword }</span> </label>
							<input
								type="password"
								name="password"
								id="password"
								value={data.password}
								onChange={handleChange}
							/>
							<button onClick={handleLogin}>Iniciar sesión</button>
						</form>
            <span>{ err.back }</span>
					</div>
				</section>
			</main>
		</>
	);
}