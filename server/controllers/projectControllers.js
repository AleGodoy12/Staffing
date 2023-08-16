const database = require('../db/database');

const projectControllers = {
	viewAllProjects: async function (req, res) {
		const pool = await database();
		try {
			const result = await pool.request().query('SELECT * FROM projects');
			res.status(200).json({
				status: 200,
				msg: 'Conexión realizada',
				projects: result.recordset,
			});
		} catch (error) {
			res.status(404).json({
				status: 404,
				msg: error.message,
			});
		} finally {
			pool.close();
		}
	},
	createProject: async function (req, res) {
		const {
			name_project,
			area_project,
			start_date_project,
			end_date_project,
			hours_estimation,
			id_user_admin,
		} = req.body;
		const pool = await database();
		try {
			const result = await pool
				.request()
				.query(
					`INSERT INTO projects(name_project, area_project, start_date_project, end_date_project, hours_estimation, id_user_admin) VALUES('${name_project}', '${area_project}', '${start_date_project}','${end_date_project}', ${hours_estimation}, ${id_user_admin})`
				);
			res.status(200).json({
				status: 200,
				msg: 'Proyecto agregado exitosamente',
			});
		} catch (error) {
			res.status(404).json({
				status: 404,
				msg: error.message,
			});
		} finally {
			pool.close();
		}
	},
	editProject: async function (req, res) {
		const {
			id_project,
			name_project,
			area_project,
			start_date_project,
			end_date_project,
			hours_estimation,
		} = req.body;
		const pool = await database();
		try {
			const request = await pool
				.request()
				.query(
					`UPDATE projects SET name_project = '${name_project}', area_project = '${area_project}', start_date_project = '${start_date_project}', end_date_project = '${end_date_project}', hours_estimation = '${hours_estimation}' WHERE id_project = '${id_project}'`
				);
			res.status(200).json({
				status: 200,
				msg: `Modificación en el proyecto ${name_project} realizada correctamente`,
			});
		} catch (error) {
			console.log(error);
			res.status(404).json({
				status: 404,
				msg: error.message,
			});
		} finally {
			pool.close();
		}
	},
	deleteProject: async function (req, res) {
		const pool = await database();
		try {
			const { id_project } = req.body;
			const request = await pool
				.request()
				.query(`DELETE FROM projects WHERE id_project = ${id_project} `);
			res.status(200).json({
				status: 200,
				msg: `Proyecto ${id_project} eliminado exitosamente`,
			});
		} catch (error) {
			res.status(200).json({
				status: 200,
				msg: error.message,
			});
		} finally {
			pool.close();
		}
	},
};

module.exports = projectControllers;