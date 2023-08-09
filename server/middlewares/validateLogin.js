const { body } = require('express-validator');

const validateLogin = [
	body('username')
		.matches('^[0-9a-zA-Z ]+$')
		.withMessage('Debe contener letras minúsculas o mayúsculas y números')
		.isLength({ min: 3, max: 15 })
		.withMessage('Debe tener mínimo 3 caracteres y máximo 15'),
	body('password')
		.isLength({ min: 8, max: 15 })
		.withMessage('Debe tener mínimo 8 caracteres y máximo 15'),
];

module.exports = validateLogin;
