const database = require('../db/database');
const assignEmployee = {
	viewEmployeesFromSelectedProject: async function (req, res) {
		const pool = await database();
		try {
			const response = await pool
				.request()
				.execute(`dbo.getEmployeesFromProject`);
			console.log(response);
			res.status(200).json({ status: 200, data: response.recordsets[0] });
		} catch (error) {
			res.status(500).json({ status: 500, msg: error });
		} finally {
			pool.close();
		}
	},
	assignEmployeeToProject: async function (req, res) {
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
	removeEmployeeFromProject: async function (req, res) {
		const { employee_id, project_id } = req.body;
		const pool = await database();
		try {
			const response = await pool
				.request()
				.input('employeeId', employee_id)
				.input('selectedProject', project_id)
				.execute(`remove_employee_from_project`);

			console.log(response);
			res.status(200).json({ status: 200, msg: response });
		} catch (error) {
			const { message } = error.originalError.info;
			res.status(404).json({ status: 404, msg: message });
		} finally {
			pool.close();
		}
	},
};

module.exports = assignEmployee;
