import LogoArbusta from '../assets/icons/arbusta-icon.png'
import '../assets/css/Login.css'

export default function Login() {
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
              <label htmlFor="user">Usuario</label>
              <input type="text" name="user" id="user" />
              <label htmlFor="password">Contraseña</label>
              <input type="password" name="" id="password" />
              <input type="submit" value="Iniciar sesión" />
            </form>
          </div>
          
        </section>
      </main>
    </>
  );
}