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

		const result = await pool.request().query('SELECT * FROM users');
		if (result.recordset.length === 0) {
			const hashedPassword = await bcrypt.hash('12345678', 8);
			await pool
				.request()
				.query(
					`INSERT INTO users(username, mail, password, permission) VALUES('admin', 'admin@gmail.com', '${hashedPassword}', 'administrador') `
				);
		}
		return pool;
	} catch (error) {
		console.log(error);
	}
};

connectDb();
module.exports = connectDb;
