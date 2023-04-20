const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  // Use your personal mysql login if not root
  user: 'root',
  // Use your personal mysql password
  password: '',
  database: 'employees'
});

connection.connect(function (err) {
  if (err) throw err;
});

module.exports = connection;
