const database = require('../db/database');
const xl = require('excel4node');
const wb = new xl.Workbook();
const path = require('path');
const os = require('os');

const columnTitleStyle = wb.createStyle({
	alignment: {
		horizontal: 'center',
	},
	font: {
		color: '#FFFFFF',
		size: 12,
		bold: true,
	},
	fill: {
		type: 'pattern',
		patternType: 'solid',
		bgColor: '#439ACF',
		fgColor: '#439ACF',
	},
	border: {
		left: {
			style: 'medium',
			color: 'black',
		},
		right: {
			style: 'medium',
			color: 'black',
		},
		top: {
			style: 'medium',
			color: 'black',
		},
		bottom: {
			style: 'medium',
			color: 'black',
		},
		outline: true,
	},
});

const rowStyle = wb.createStyle({
	font: {
		color: '#000000',
		size: 10,
	},
	fill: {
		type: 'pattern',
		patternType: 'solid',
		bgColor: '#FFCD00',
		fgColor: '#FFCD00',
	},
	border: {
		left: {
			style: 'medium',
			color: 'black',
		},
		right: {
			style: 'medium',
			color: 'black',
		},
		top: {
			style: 'medium',
			color: 'black',
		},
		bottom: {
			style: 'medium',
			color: 'black',
		},
		outline: true,
	},
});

const downloadData = {
	downloadQueries: async function (req, res) {
		try {
			const jsonData = req.body;
			const keys = Object.keys(jsonData[0]);

			const ws = wb.addWorksheet('employees');

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
	downloadSelectedInfo: async function (req, res) {
		const userHome = os.homedir();
		const downloadPath = path.join(userHome, 'Downloads');
		const pool = await database();
		try {
			const { selectedQuery } = req.params;
			const response = await pool
				.request()
				.input(`selectedQuery`, selectedQuery)
				.execute(`dbo.getInfo`);
			const jsonData = response.recordset;
			const wb = new xl.Workbook();
			const ws = wb.addWorksheet(`${selectedQuery}`);
			if (jsonData.length > 0) {
				const keys = Object.keys(jsonData[0]);
				keys.forEach((key, index) => {
					ws.cell(1, index + 1)
						.string(key)
						.style(columnTitleStyle);
				});

				jsonData.forEach((employee, rowIndex) => {
					const employeeValues = Object.values(employee);
					employeeValues.forEach((emp, index) => {
						const rowValue =
							employeeValues[index] === null
								? 'null'
								: employeeValues[index].toString();

						ws.cell(rowIndex + 2, index + 1)
							.string(rowValue)
							.style(rowStyle);
					});
				});
				wb.write(`${downloadPath}/${selectedQuery}.xlsx`);
			}
			res.status(200).json({ status: 200, data: 'Projects file created!' });
		} catch (error) {
			res.status(400).json({ status: 404, error: error });
		} finally {
			pool.close();
		}
	},
};

module.exports = downloadData;
