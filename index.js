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
                addNewEmployee();
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
// Function to display the employee table
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
// function to display the department table
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
  // function to view the role tablr
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

  function addNewEmployee() {
    // Get the list of roles and managers for selection using Promise.all
    Promise.all([db.viewAllRoles(), db.viewAllEmployees()])
    //Saving the data to an array for future displating of choices
    .then(([roles, managers]) => {
    //Mapping over the roles array and making each role into an object containing a name and value property for use with inquirer
      const roleChoices = roles.map((role) => ({
        name: role.title,
        value: role.id,
      }));
      // Same array mapping concept as used before, but now using manger first and last name
      const managerChoices = managers.map((manager) => ({
        name: `${manager.first_name} ${manager.last_name}`,
        value: manager.id,
      }));
      //Prompts for creating a new employee
      inquirer
        .prompt([
          {
            type: 'input',
            name: 'first_name',
            message: "Enter the employee's first name:",
          },
          {
            type: 'input',
            name: 'last_name',
            message: "Enter the employee's last name:",
          },
        // Implementing the roleChoices and managerChoices variables in order for user to select
          {
            type: 'list',
            name: 'role_id',
            message: 'Select the role:',
            choices: roleChoices,
          },
          {
            type: 'list',
            name: 'manager_id',
            message: 'Select the manager:',
            choices: managerChoices
        },
    ])
    // Finally using addEmployee function in our db.js file to add all gathered data and update our employee table
    .then((answer) => {
      db.addEmployee(answer.first_name, answer.last_name, answer.role_id, answer.manager_id)
      .then(() => {
        console.log('Employee added successfully!');
        mainMenu();
      });
    });
});
}

// Prompt to add a new department, only needs a name as a value
function addDepartment() {
    inquirer
    .prompt([
        { type: 'input',
          name: 'name',
          message: 'Enter the department name:',
        },
      ])
      .then((answer) => {
        db.addDepartment(answer.name)
        .then(() => {
          console.log('Department added successfully!');
          mainMenu();
        });
      });
    }


  mainMenu()