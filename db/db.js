//requiring connetion variable used for mysql2 login credentials
const connection = require('./connection')

//Function that should return all employees and data when called. Joined manager data from the same table to list the manager by name and not id for the employee
function viewAllEmployees() {
    return new Promise((resolve, reject) => {
      connection.query(`SELECT emp.id, emp.first_name, emp.last_name, role.title, role.salary, CONCAT(mgr.first_name, ' ', mgr.last_name) AS manager
      FROM employee AS emp
      LEFT JOIN role ON emp.role_id = role.id
      LEFT JOIN employee AS mgr ON emp.manager_id = mgr.id;`,
       (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

//Function that should return all departments and data when called
function viewAllDepartments() {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM department', (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }
// Function to view all roles. Joined department_name from department table to display name instead of id
  function viewAllRoles() {
    return new Promise((resolve, reject) => {
      connection.query('SELECT role.id, role.title, role.salary, department.name as department_name FROM role LEFT JOIN department ON role.department_id = department.id;',
       (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }
  
// Function to add an employee, using the required information.
    function addEmployee(first_name, last_name, role_id, manager_id) {
      return new Promise((resolve, reject) => {
        connection.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [first_name, last_name, role_id, manager_id], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }


  //Exporting all functions for use with main index file
  module.exports = {
    viewAllEmployees: viewAllEmployees,
    viewAllDepartments: viewAllDepartments,
    viewAllRoles: viewAllRoles,
    addEmployee: addEmployee
  };

