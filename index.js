const inquirer = require('inquirer')
const db = require('./db/db');

function mainMenu() {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'action',
          message: 'What would you like to do?',
          choices: [
            'View all departments',
            'View all roles',
            'View all employees',
            'Add a department',
            'Add a role',
            'Add an employee',
            'Update an employee role',
            'Exit']}
        ])
    }

function viewEmployees() {
  db.viewAllEmployees()
    .then((rows) => {
      console.table(rows);
      mainMenu();
    })
    .catch((err) => {
      console.error(err);
      mainMenu();
    });
}

function viewDepartments() {
    db.viewAllDepartments()
      .then((rows) => {
        console.table(rows);
        mainMenu();
      })
      .catch((err) => {
        console.error(err);
        mainMenu();
      });
  }
  function viewRoles() {
    db.viewAllRoles()
      .then((rows) => {
        console.table(rows);
        mainMenu();
      })
      .catch((err) => {
        console.error(err);
        mainMenu();
      });
  }

viewEmployees()