import mysql from "mysql2";
import * as dotenv from "dotenv";
dotenv.config();

var db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '123',
  database: 'libredbbeta2.0',
});

db.connect((err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log('db authorized: ' + db.authorized);
  }
   db.query('SELECT 1', (queryErr, results) => {
    if (queryErr) {
      console.error('Error executing query:', queryErr.message);
      return;
    }

    console.log('Database access: successful');
  });
});

export default db;