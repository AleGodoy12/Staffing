const database = require('../db/database');
const assignEmployee = {
	viewEmployeesFromSelectedProject: async function (req, res) {
		const { id_project } = req.params;
		const pool = await database();
		try {
			const response = await pool
				.request()
				.input(`id_project`, id_project)
				.execute(`dbo.getEmployeesFromProject`);
			console.log(response);
			res.status(200).json({ status: 200, data: response.recordsets[0] });
		} catch (error) {
			res.status(500).json({ status: 500, error: error });
		} finally {
			pool.close();
		}
  },
  viewLeaderFromSelectedProject: async function (req,res) {
    const { selected_project } = req.params;
		const pool = await database();
		try {
			const response = await pool
				.request()
				.input(`selectedProject`, selected_project)
				.execute(`dbo.viewLeaderDataFromSelectedProject`);
			console.log(response);
			res.status(200).json({ status: 200, data: response.recordsets[0] });
		} catch (error) {
			res.status(500).json({ status: 500, error: error });
		} finally {
			pool.close();
		}
  },
	viewFreeEmployees: async function (req, res) {
		const { selected_project } = req.params;
		const pool = await database();
		try {
			const response = await pool
				.request()
				.input('selected_project', selected_project)
				.execute(`dbo.viewFreeEmployes`);
			const employees = response.recordsets[0];
			const skills = response.recordsets[1];

			employees.map((employee) => {
				employee.skills = [];
				skills.map(
					(skill) =>
						skill.id_employee == employee.id_employee &&
						employee.skills.push(skill.skill_name)
				);
			});
			res.status(200).json({ status: 200, data: employees });
		} catch (error) {
			res.status(500).json({ status: 500, error: error });
		} finally {
			pool.close();
		}
	},
	assignEmployeeToProject: async function (req, res) {
		const { project_id, employee_id, hours_to_assign } = req.params;
		console.log(project_id, employee_id, hours_to_assign);
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
			res.status(200).json({ status: 200, data: result });
		} catch (error) {
			const { message } = error.originalError.info;
			res.status(404).json({ status: 404, error: message });
		} finally {
			pool.close();
		}
	},
	removeEmployeeFromProject: async function (req, res) {
		const { employee_id, project_id } = req.params;
		const pool = await database();
		try {
			const response = await pool
				.request()
				.input('employeeId', employee_id)
				.input('selectedProject', project_id)
				.execute(`remove_employee_from_project`);

			console.log(response);
			res.status(200).json({ status: 200, data: response });
		} catch (error) {
			const { message } = error.originalError.info;
			res.status(404).json({ status: 404, error: message });
		} finally {
			pool.close();
		}
	},
	viewEmployeesInfo: async function (req, res) {
		const pool = await database();
		try {
			const response = await pool.request().execute(`dbo.viewEmployeesInfo`);
			const data = response.recordset;
			res.status(200).json({ status: 200, data: data });
		} catch (error) {
			const { message } = error.originalError.info;
			res.status(404).json({ status: 404, error: message });
		} finally {
			pool.close();
		}
	},
};

module.exports = assignEmployee;
