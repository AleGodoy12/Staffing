const fs = require('fs');
const database = require('../db/database');
// Require library
var xl = require('excel4node');
const wb = new xl.Workbook();
const columnTitleStyle = wb.createStyle({
	font: {
		color: '#000000',
		size: 11,
		bold: true,
	},
	fill: {
		type: 'pattern',
		patternType: 'solid',
		bgColor: '#e0ffff',
		fgColor: '#e0ffff',
	},
});

const rowStyle = wb.createStyle({
	font: {
		color: '#000000',
		size: 10,
	},
});

const downloadData = {
	downloadQueries: async function (req, res) {
		try {
			const jsonData = req.body;
			const keys = Object.keys(jsonData[0]);

			const ws = wb.addWorksheet('employees');

			// Iterate over the keys and write them to the worksheet
			keys.forEach((key, index) => {
				ws.cell(1, index + 1)
					.string(key)
					.style(columnTitleStyle);
			});

			jsonData.forEach((employee, rowIndex) => {
				const employeeValues = Object.values(employee);
				employeeValues.forEach((emp, index) => {
					ws.cell(rowIndex + 2, index + 1)
						.string(employeeValues[index].toString())
						.style(rowStyle);
				});
			});

			wb.write('employees.xlsx');
			res.status(200).json({ status: 200, data: 'Employees file created!' });
		} catch (error) {
			res.status(400).json({ status: 404, error: error });
		}
	},
	downloadProjects: async function (req, res) {
		const pool = await database();
		try {
			const { project_id } = req.params;
			const response = await pool
				.request()
				.input(`project_id`, project_id)
				.execute(`dbo.get_all_info_from_project`);
			const jsonData = response.recordset;
			const wb = new xl.Workbook();
			const ws = wb.addWorksheet('projects');

			const keys = Object.keys(jsonData[0]);

			// Iterate over the keys and write them to the worksheet
			keys.forEach((key, index) => {
				ws.cell(1, index + 1)
					.string(key)
					.style(columnTitleStyle);
			});

			jsonData.forEach((employee, rowIndex) => {
				const employeeValues = Object.values(employee);
				employeeValues.forEach((emp, index) => {
					ws.cell(rowIndex + 2, index + 1)
						.string(employeeValues[index].toString())
						.style(rowStyle);
				});
			});

			wb.write('projects.xlsx');
			res.status(200).json({ status: 200, data: 'Projects file created!' });
		} catch (error) {
			res.status(400).json({ status: 404, error: error });
		} finally {
			pool.close();
		}
	},
};

module.exports = downloadData;
