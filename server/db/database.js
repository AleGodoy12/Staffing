const sql = require('mssql');

const connectDb = async () => {
    try{
        await sql.connect({
            user: process.env.USER,
            password: process.env.PASSWORD,
            server: process.env.SERVER,
            database: process.env.DATABASE,
            options: {
                encrypt: true, // for azure
                trustServerCertificate: true // change to true for local dev / self-signed certs
              }
        })
        console.log('Db conectada');
    } catch(error){
        console.log(error);
    } finally {
        sql.close();
    }
}

module.exports = connectDb