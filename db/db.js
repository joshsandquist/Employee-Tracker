const connection = require('./connection')

function viewAllEmployees(table) {
    connection.query('SELECT * FROM employee', (err, rows) => {
      if (err) throw err;
      table(rows);
    });
  }

  module.exports = {
    viewAllEmployees: viewAllEmployees
  };