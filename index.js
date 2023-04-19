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
            'View All Departments',
            'View All Roles',
            'View All Employees',
            'Add a Department',
            'Add a Role',
            'Add an Employee',
            'Update an Employee Role',
            'Exit']}
        ])
        //Using switch statements to run the proper query based on user choice
        .then((answer) => {
            switch (answer.action) {
              case 'View All Departments':
                viewDepartments();
                break;
              case 'View All Roles':
                viewRoles();
                break;
              case 'View All Employees':
                viewEmployees();
                break;
              case 'Add a Department':
                addDepartment();
                break;
              case 'Add a Role':
                addRole();
                break;
              case 'Add an Employee':
                addEmployee();
                break;
              case 'Update an Employee Role':
                updateEmployeeRole();
                break;
              case 'Exit':
                db.closeConnection();
                break;
            }
          });
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

  mainMenu()