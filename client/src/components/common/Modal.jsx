import { useState } from "react";

export default function Modal({msg, buttonText, execute}) {

  const [open, setOpen] = useState(false);

	const openM = () => {
		setOpen(true);
	};

	const closeM = () => {
		setOpen(false);
  };
  
  const handleFunction = async () => {
    setOpen(false)
    await execute()
  }

  return (
		<>
			<button onClick={openM}>{buttonText}</button>
			<section
				className="commonModal"
				style={open ? { display: 'flex' } : { display: 'none' }}
			>
        <p>{ msg }</p>
				<div>
					<button onClick={closeM}>
						<span>Cancelar</span>
					</button>
					<button
						onClick={handleFunction}
          >
            Aceptar
					</button>
				</div>
			</section>
		</>
	);
}