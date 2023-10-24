import { useState } from 'react';
import '../../assets/css/Modal.css';
import Check from '../../assets/icons/check-circle-fill.svg';
import Warning from '../../assets/icons/exclamation-triangle-fill.svg';
import Danger from '../../assets/icons/x-circle-fill.svg';

export default function Modal({
	msg,
	buttonText,
	execute,
	question,
	action,
	type,
}) {
	const [open, setOpen] = useState(false);

	const openM = () => {
		setOpen(true);
	};

	const closeM = () => {
		setOpen(false);
	};

	const handleFunction = () => {
		setOpen(false);
		execute();
	};

	return (
		<>
			<button className="open-common-modal" onClick={openM}>
				{buttonText}
			</button>
			<section
				className="common-modal"
				style={open ? { display: 'flex' } : { display: 'none' }}
			>
				<div className="common-modal-container">
					<h2>{action}</h2>
					<p>{question}</p>
					<div className="icon-advise">
						<img src={type === 'check' ? Check : type === 'warning' ? Warning : type === 'danger' ? Danger : ''} />
					</div>
					<p>{msg}</p>
					<div>
						<button onClick={closeM}>
							<span>Cancelar</span>
						</button>
						<button onClick={handleFunction}>Aceptar</button>
					</div>
				</div>
			</section>
		</>
	);
}
