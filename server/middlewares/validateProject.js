const { body } = require('express-validator');

const validateProject = [
	body('name_project')
		.matches('^(?!^[0-9]+$)[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+| [a-zA-Z0-9]+)*$')
		.withMessage('Solo caracteres alfanumericos y guiones son permitidos.')
		.isLength({ max: 30 })
		.withMessage('Máximo 30 caracteres'),
	body('area_project')
		.matches('^[a-zA-Z ]+$')
		.withMessage('Solo estan permitidas letras y espacios entre palabras.')
		.isLength({ max: 30 })
		.withMessage('Máximo 30 caracteres'),
	body('start_date_project'),
	body('end_date_project'),
	body('hours_estimation')
		.isNumeric()
		.withMessage('Por favor ingrese un número válido'),
	body('id_user_admin')
		.isNumeric()
		.withMessage('Por favor ingrese un número de administrador válido'),
];

module.exports = validateProject;
