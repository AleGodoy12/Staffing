import { useState } from 'react';
import '../../assets/css/AssignModal.css'



export default function AssignModal({ children }) {

  const [open, setOpen] = useState(false)

  const openM = () => {
    setOpen(true)
  }

  const closeM = () => {
    setOpen(false)
  }

  return (
    <>
      <button onClick={openM} >OpenModal</button>
      <article className={`modal`} style={ open ? {display:'block'} : {display:'none'}}>
        <div className="modal-container">
          <button className="modal-close" onClick={closeM}>
            X
          </button>
          {children}
        </div>
      </article>
    </>
  );
}

