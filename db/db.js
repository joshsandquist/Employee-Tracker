//requiring connetion variable used for mysql2 login credentials
const connection = require('./connection')

//Function that should return all Employees and data when called
function viewAllEmployees(table) {
    //Refactored the query to include employee salary from the role table in the function
    connection.query(
      'SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary FROM employee LEFT JOIN role ON employee.role_id = role.id;',
      (err, rows) => {
        if (err) throw err;
        table(rows);
      }
    );
  }

//Function that should return all departments and data when called
function viewAllDepartments(table) {
    connection.query('SELECT * FROM department', (err, rows) => {
      if (err) throw err;
      table(rows);
    });
  }

  //Exporting all functions for use with main index file
  module.exports = {
    viewAllEmployees: viewAllEmployees,
    viewAllDepartments: viewAllDepartments
  };

