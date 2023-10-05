const sql = require('mssql');
const bcrypt = require('bcrypt');

const connectDb = async function () {
	try {
		const pool = await sql.connect({
			user: process.env.USER,
			password: process.env.PASSWORD,
			server: process.env.SERVER,
			database: process.env.DATABASE,
			options: {
				encrypt: true, // for azure
				trustServerCertificate: true, // change to true for local dev / self-signed certs
			},
		});

		// const result = await pool.request().query('SELECT * FROM users');
		// if (result.recordset.length === 0) {
		// 	const hashedPassword = await bcrypt.hash('12345678', 8);
		// 	await pool
		// 		.request()
		// 		.query(
		// 			`INSERT INTO users(username, mail, password, permission) VALUES('admin', 'admin@gmail.com', '${hashedPassword}', 'administrador') `
		// 		);
		// }
		const result = await pool.request().query('SELECT * FROM employees');
		if (result.recordset.length === 0) {
			const hashedPassword = await bcrypt.hash('12345678', 8);
			await pool
				.request()
				.query(
					`INSERT INTO employees(name, lastname, mail, role, used_hours, free_hours, total_hours, company) VALUES('admin', 'admin', 'admin@arbusta.com', 'administrador', 0, 0, 0, 'Arbusta')`
				);
			await pool
				.request()
				.query(
					`INSERT INTO users(username, id_employee, mail, password, permission) VALUES('admin', 1, 'admin@gmail.com', '${hashedPassword}', 'administrador') `
				);
		}
		const checkBench = await pool
			.request()
			.query(
				`SELECT name_project FROM dbo.projects WHERE name_project = 'Bench'`
			);
		if (checkBench.recordset.length === 0) {
			await pool
				.request()
				.query(
					`INSERT INTO projects(name_project, area_project, leader, start_date_project, end_date_project, hours_estimation, id_user_admin)VALUES('Bench', 'Arbusta', 1, '2023-08-16', '2030-10-16', 1000, 1)`
				);
		}
		return pool;
	} catch (error) {
		console.log(error);
	}
};

connectDb();
module.exports = connectDb;
