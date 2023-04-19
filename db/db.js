//requiring connetion variable used for mysql2 login credentials
const connection = require('./connection')

//Function that should return all Employees and data when called
function viewAllEmployees(table) {
    connection.query(
      `SELECT emp.id, emp.first_name, emp.last_name, role.title, role.salary, CONCAT(mgr.first_name, ' ', mgr.last_name) AS manager
      FROM employee AS emp
      LEFT JOIN role ON emp.role_id = role.id
      LEFT JOIN employee AS mgr ON emp.manager_id = mgr.id;`,
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
// Function to view all roles. Joined department_name from department table to display name instead of id
  function viewAllRoles(table) {
    connection.query(
      'SELECT role.id, role.title, role.salary, department.name as department_name FROM role LEFT JOIN department ON role.department_id = department.id;',
      (err, rows) => {
        if (err) throw err;
        table(rows);
      }
    );
  }
  //Exporting all functions for use with main index file
  module.exports = {
    viewAllEmployees: viewAllEmployees,
    viewAllDepartments: viewAllDepartments,
    viewAllRoles: viewAllRoles
  };

