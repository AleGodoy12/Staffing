const database = require('../db/database');

const assignEmployee = {
	showSelectedProject: async function (req, res) {
		const { selectedProject } = req.query;
		const pool = await database();
		try {
			const result = await pool
				.request()
				.query(
					`SELECT * FROM dbo.projects WHERE id_project = ${selectedProject}`
				);
			res.status(200).json({ status: 200, data: result.recordset[0] });
		} catch (error) {
			res.status(404).json({ status: 404, error: error });
		} finally {
			pool.close();
		}
	},
	assignEmployee: async function (req, res) {
		const { selectedProject } = req.query;
		console.log(selectedProject);
		const pool = await database();
		try {
			const result = await pool
				.request()
				.query(
					`SELECT * FROM dbo.project_employees WHERE id_project = ${selectedProject}`
				);

			res.status(200).json({ status: 200, data: result.recordset });
		} catch (error) {
			res.status(404).json({ status: 404, error: error });
		} finally {
			pool.close();
		}
	},
};

module.exports = assignEmployee;
