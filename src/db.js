/* import { createPool } from "mysql"; */
// Import the mysql module
import mysql from 'mysql';

/* export const pool = createPool({
  host: "localhost",
  user: "root",
  password: "faztpassword",
  port: 3306,
  database: "customersdb",
}); */
export const pool = mysql.createConnection({
  host     : process.env.RDS_HOSTNAME,
  user     : process.env.RDS_USERNAME,
  password : process.env.RDS_PASSWORD,
  port     : process.env.RDS_PORT
});

pool.connect(function(err) {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }

  console.log('Connected to database.');
});