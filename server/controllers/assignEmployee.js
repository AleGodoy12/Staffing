const sql = require('mssql');
const database = require('../db/database');

const assignEmployee = {
	showSelectedProject: async function (req, res) {
		const { employee_id, hours_to_assign, project_id } = req.body;
		console.log(Number(project_id));
		const pool = await database();
		try {
			const result = await pool
				.request()
				.input('selectedProject', project_id)
				.input('selectedHours', )
				.output('freeHours')
				.execute(`check_project_availability`);
			res.status(200).json({ status: 200, data: result });
			console.log(result);
		} catch (error) {
			res.status(404).json({ status: 404, error: error });
		} finally {
			pool.close();
		}
	},
};

module.exports = assignEmployee;
