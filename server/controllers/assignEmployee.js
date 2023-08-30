const database = require('../db/database');
// const sql = require('mssql')
const assignEmployee = {
	showSelectedProject: async function (req, res) {
		const { employee_id, hours_to_assign, project_id } = req.body;
		console.log(employee_id, hours_to_assign, project_id);
		const pool = await database();
		try {
			const result = await pool
				.request()
				.input('selectedProject', project_id)
				.input('selectedHours', hours_to_assign)
				.input('employeeId', employee_id)
				.input('newProjectHoursRequired', hours_to_assign)
				.output('freeHours')
				.output('employeeFreeHoursAfterCheck')
				.execute(`assign_employee_to_project`);
			console.log(result);
			res.status(200).json({ status: 200, data: result });
		} catch (error) {
			const { message } = error.originalError.info;
			res.status(404).json({ status: 404, error: message });
		} finally {
			pool.close();
		}
	},
};

module.exports = assignEmployee;
