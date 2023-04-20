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
            // Made Exit text choice red for easy viewing.
            {
                name: '\x1b[31mExit\x1b[0m',
                value: 'Exit',
              }]}
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
                addNewRole();
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

// Prompt function for adding a new employee to the database
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
        console.log('Employee added successfully!')
        mainMenu()
      });
    })
})
};

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
          console.log('Department added successfully!')
          mainMenu();
        })
      })
    };
    
// Prompt to add a new role to the database

function addNewRole () {
    //Similar to the addNewEmployee function, we will need to gather data from the database to give the user choices

    db.viewAllDepartments()
    .then((departments) => {
    // Mapping the departments table to gather choices for the user to assign the new role to
        const departmentChoices = departments.map((depts) => ({
            name: depts.name,
            value: depts.id
        }))
        inquirer
            .prompt([
                {
                    type: 'input',
                    name: 'title',
                    message: 'Enter the role title:',
                  },
                  {
                    type: 'input',
                    name: 'salary',
                    message: 'Enter the role salary:',
                  },
                  {
                    type: 'list',
                    name: 'department_id',
                    message: 'Select the department:',
                    choices: departmentChoices,
                  },
            ])
            // User choices will be added as a new role in the role table
            .then((answer) => {
                db.addRole(answer.title, answer.salary, answer.department_id)
                .then(() => {
                  console.log('Role added successfully!');
                  mainMenu();
                })
              });
          });
        };

        function updateEmployeeRole() {
  // Same method as before for gathering table data, this time using employye and role tables
  Promise.all([db.viewAllEmployees(), db.viewAllRoles()])
  // Mapping and saving the employee data we need for use with inquirer
    .then(([employees, roles]) => {
    const employeeChoices = employees.map((employee) => ({
      name: `${employee.first_name} ${employee.last_name}`,
      value: employee.id,
    }));
// Mapping and saving the role data we need for use with inquirer
    const roleChoices = roles.map((role) => ({
      name: role.title,
      value: role.id,
    }));

    inquirer
      .prompt([
        {
          type: 'list',
          name: 'employee_id',
          message: 'Select the employee to update:',
          choices: employeeChoices,
        },
        {
          type: 'list',
          name: 'role_id',
          message: 'Select the new role:',
          choices: roleChoices,
        },
      ])
      .then((answer) => {
        db.updateEmployeeRole(answer.employee_id, answer.role_id).then(() => {
          console.log('Employee role updated successfully!')
          mainMenu();
        });
      });
  });
};

  mainMenu()