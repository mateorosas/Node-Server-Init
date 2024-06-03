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
export const pool = mysql.createPool({
  host     : "terraform-20240603164707948400000008.c9ws6cywempm.us-east-1.rds.amazonaws.com",
  user     : "admin",
  password : "Admin1234*",
  port     : 3306,
  database: "prod_db_priceless_app"
});
pool.getConnection(function(err) {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }

  console.log('Connected to database.');
});

export const connection = mysql.createConnection({
  host     : "terraform-20240603164707948400000008.c9ws6cywempm.us-east-1.rds.amazonaws.com",
  user     : "admin",
  password : "Admin1234*",
  port     : 3306,
  database: "prod_db_priceless_app"
});
