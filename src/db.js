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
  host     : "",
  user     : "admin",
  password : "Admin1234*",
  port     : 3306
});

pool.connect(function(err) {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }

  console.log('Connected to database.');
});