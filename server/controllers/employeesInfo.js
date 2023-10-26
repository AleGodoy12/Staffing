const database = require('../db/database');

const employeesInfo = {
	employeesWithoutAssignation: async function (req, res) {
		const pool = await database();
		try {
			const response = await pool
				.request()
				.execute(`dbo.employeesWithoutAssignation`);
			console.log(response);
			res.status(200).json({ status: 200, data: response.recordsets[0] });
		} catch (error) {
			res.status(500).json({ status: 500, error: error });
		} finally {
			pool.close();
		}
	},
	employeesWithAssignation: async function (req, res) {
		const pool = await database();
		try {
			const response = await pool
				.request()
				.execute(`dbo.allEmployeesIncludingBench`);
			console.log(response);
			res.status(200).json({ status: 200, data: response.recordsets[0] });
		} catch (error) {
			res.status(500).json({ status: 500, error: error });
		} finally {
			pool.close();
		}
	},
};

module.exports = employeesInfo;
