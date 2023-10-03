const database = require('../db/database');
const bcrypt = require('bcrypt');

const usersControllers = {
	createUser: async function (req, res) {
		const { username, id_employee, mail, password, permission } = req.body;
		const hashedPassword = await bcrypt.hash(password, 8);
		const pool = await database();
		try {
			const response = await pool
				.request()
				.input(`username`, username)
				.input(`id_employee`, id_employee)
				.input(`mail`, mail)
				.input(`password`, hashedPassword)
				.input(`permission`, permission)
				.execute('dbo.createUser');
			const message = `Usuario ${username} creado correctamente`;
			res.status(200).json({ status: 200, data: message });
		} catch (error) {
			const { message } = error.originalError.info;
			res.status(404).json({ status: 404, error: message });
		} finally {
			pool.close();
		}
	},
	deleteUser: async function (req, res) {
		const { id_user } = req.params;
		const pool = await database();
		try {
			const response = await pool
				.request()
				.input('id_user', id_user)
				.execute(`dbo.deleteUser`);
			const message = 'Usuario eliminado correctamente';
			res.status(200).json({ status: 200, data: message });
		} catch (error) {
			const { message } = error.originalError.info;
			res.status(404).json({ status: 404, error: message });
		} finally {
			pool.close();
		}
	},
};

module.exports = usersControllers;
