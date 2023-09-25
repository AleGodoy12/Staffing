import { useState } from 'react';
import '../../assets/css/AssignModal.css'
import axios from 'axios';

const url = 'http://localhost:3000/';

export default function AssignModal({ idProject, idEmployee, load, nameSurname, freeHours, usedHours }) {
  const [open, setOpen] = useState(false);

  const openM = () => {
    setOpen(true);
  };

  const closeM = () => {
    setOpen(false);
  };

  const [hoursToAssign, setHoursToAssign] = useState(0);
  
  const assignEmployee = async (proyecto, empleado, horas) => {
    let project_id = proyecto;
    let employee_id = empleado;
    let hours_to_assign = horas;

    const res = await axios.post(`${url}project/${project_id}/${employee_id}/${hours_to_assign}`)
    setOpen(false)
    setHoursToAssign(0)
    await load()
  }

  return (
    <>
      <button className='open-modal' onClick={openM}>Asignar</button>
      <section
        className="modal"
        style={open ? { display: 'flex' } : { display: 'none' }}
      >
        <div className="modal-container">
          <p>Ingrese la cantidad de horas a asignar</p>
          <h3>{nameSurname}</h3>
          <p>Horas disponibles: <span>{ freeHours }</span></p>
          <p>Horas ocupadas: <span>{ usedHours }</span></p>
          <input
              value={hoursToAssign || ''}
              onChange={(e) => setHoursToAssign(e.target.value)}
              type="number"
              name="assignHours"
              id=""
              required
          />
          <div>
            <button onClick={closeM}>
              <span>Cancelar</span>
            </button>
            <button onClick={() => assignEmployee(idProject, idEmployee, hoursToAssign)}> Aceptar </button>
          </div>
        </div>
      </section>
    </>
  );
}

