const database = require('../db/database');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');

const loginControllers = {
	showLogin: async function (req, res) {
		if (req.session.loggedIn) {
			res.status(200).json({ message: 'Estas logeado' });
		} else {
			res.status(404).json({ message: 'No estas logeado' });
		}
	},
	loginUser: async function (req, res) {
		const { username, password } = req.body;

		const { errors } = validationResult(req);

		if (username && password) {
			const pool = await database();
			const result = await pool
				.request()
				.query(`SELECT * FROM users WHERE username = '${username}'`);
			pool.close();
			const resp = result.recordset;

			if (errors.length !== 0) {
				res.status(422).json({
					status: 422,
					message:
						'The client request contains semantic errors, and the server can’t process it',
					data: errors,
				});
			} else {
				if (resp.length === 0) {
					return res.status(403).json({
						status: 403,
						message: 'Acceso no autorizado',
						errorDetail: 'Usuario no encontrado',
					});
				} else {
					const match = await bcrypt.compare(password, resp[0].password);
					if (match) {
						req.session.loggedIn = {
							username: resp[0].username,
							password: resp[0].password,
						};
						return res
							.status(200)
							.json({ status: 200, message: 'Usuario encontrado' });
					} else {
						return res.status(403).json({
							status: 403,
							message: 'Acceso no autorizado',
							errorDetail: 'Contraseña incorrecta',
						});
					}
				}
			}
		} else {
			return res.status(404).json({
				status: 404,
				message: 'The requested resource was not found.',
				errorDetail: 'Usuario y/o contraseña no ingresados',
			});
		}
	},
};

module.exports = loginControllers;
